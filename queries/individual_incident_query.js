category_restriction = "category like '%'"
//category_restriction = "category in ('Potholes')"
//category_restriction = "category in ('Tree Trimming')"
//category_restriction = "category in ('Signs / Bus Shelters / Pavement Markings')"
//category_restriction = "category in ('Public Space, Streets and Drains')"
//category_restriction = "category in ('Trash & Recycling')"
//category_restriction = "category in ('Policing Issue')"
//category_restriction = "category in ('Traffic/Road Safety')"

start_date = ""
end_date = ""
date_restriction = ""
//date_restriction = "AND created_at_local <= " + end_date + "AND created_at_local >= " + start_date

query = "SELECT * FROM seeclickfix WHERE " + category_restriction + date_restriction
