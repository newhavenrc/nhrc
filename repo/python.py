import json
import urllib2
import csv

#jq = jq.bake('-M')  # disable colorizing
json_data = json.load(urllib2.urlopen('https://seeclickfix.com/api/v2/issues?page=1&per_page=10&status=closed'))

print json.dumps(json_data, indent=4, sort_keys=True)

f = csv.writer(open("test.csv", "wb+"))

# Write CSV Header, If you dont need that, remove this line
f.writerow(["id", "lat", "lng", "status", "summary", "rating", "description", "created_at", "updated_at", "acknowledged_at", "closed_at"])

for x in json_data["issues"]:
    f.writerow([x["id"], 
                x["lat"], 
                x["lng"], 
                x["status"],
                x["summary"],
                x["description"],
                x["rating"],
                x["created_at"],
                x["updated_at"],
                x["acknowledged_at"],
                x["closed_at"]
             ])


