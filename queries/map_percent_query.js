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
