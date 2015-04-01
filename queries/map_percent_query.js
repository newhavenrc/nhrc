category_restriction = ""
//category_restriction = "AND category in ('Potholes')"
//category_restriction = "AND category in ('Tree Trimming')"
//category_restriction = "AND category in ('Signs / Bus Shelters / Pavement Markings')"
//category_restriction = "AND category in ('Public Space, Streets and Drains')"
//category_restriction = "AND category in ('Trash & Recycling')"
//category_restriction = "AND category in ('Policing Issue')"
//category_restriction = "AND category in ('Traffic/Road Safety')"

start_date = ""
end_date = ""
date_restriction = ""
//date_restriction = "AND created_at_local <= " + end_date + "AND created_at_local >= " + start_date

level = "nh_wards"
//level = "nh_census_blocks"
//level = "nh_neighborhoods"

query = "SELECT *,
	--total number of cases
	(SELECT COUNT(*)
	FROM seeclickfix
	WHERE ST_Intersects(seeclickfix.the_geom, " + level + ".the_geom)" + category_restriction + date_restriction + ") TOTAL,
	--cases that have been closed
	(SELECT SUM(CASE WHEN closed_at_local is not null THEN 1 ELSE 0 END)
	FROM seeclickfix
	WHERE ST_Intersects(seeclickfix.the_geom, " + level + ".the_geom)" + category_restriction + date_restriction + ") CLOSED,
	--percent of total cases that have been closed
	(SELECT CAST(SUM(CASE WHEN closed_at_local is not null THEN 1 ELSE 0 END) AS DECIMAL) / COUNT(*) * 100
	FROM seeclickfix
	WHERE ST_Intersects(seeclickfix.the_geom, " + level + ".the_geom)" + category_restriction + date_restriction + ") PERCENT_CLOSED
FROM " + level


//Alternate query. Runs pretty quickly for me.
query = "SELECT  polygons.the_geom_webmercator, 
	count(points.the_geom) AS issue_count, 
	sum(CASE WHEN points.closed_at_local is not null THEN 1 ELSE 0 END) AS issues_closed, 
	sum(CASE WHEN points.acknowledged_at_local is not null THEN 1 ELSE 0 END) AS issues_acknowledged, 
	CAST(sum(CASE WHEN points.acknowledged_at_local is not null THEN 1 ELSE 0 END) AS DECIMAL) / count(points.the_geom) AS pct_acknowledged,
	CAST(sum(CASE WHEN points.closed_at_local is not null THEN 1 ELSE 0 END) AS DECIMAL) / count(points.the_geom) AS pct_closed, 
	avg(DATE_PART('day', CASE WHEN points.closed_at_local is null then points.closed_at_local else points.created_at END - points.created_at_local)) AS mean_close_time, 
	avg(DATE_PART('day', points.acknowledged_at_local - points.created_at_local)) AS mean_acknowledge_time,
	avg(DATE_PART('day', CASE WHEN points.closed_at_local is null then points.closed_at_local else points.created_at END - points.acknowledged_at_local)) AS mean_acknowledge_to_close
	FROM " + level + " as polygons LEFT JOIN (select * from seeclickfix where category in ('" + category + "') AND created_at_local <= '" + end_date + "' AND created_at_local >= '" + start_date + "') as points	
	ON st_contains(polygons.the_geom,points.the_geom) 
	WHERE ST_Intersects(points.the_geom, polygons.the_geom)
	GROUP BY polygons.the_geom_webmercator"

