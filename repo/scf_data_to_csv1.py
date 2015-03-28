#!/usr/bin/env python

import json
import urllib2
import csv

#jq = jq.bake('-M')  # disable colorizing
#json_data = json.load(urllib2.urlopen('https://seeclickfix.com/api/v2/issues?page=1&per_page=10&status=closed'))
json_data = json.load(urllib2.urlopen('https://seeclickfix.com/api/v2/issues?place_url=new-haven&page=1&per_page=500'))

#print json.dumps(json_data, indent=4, sort_keys=True)

nhdir = '/Library/WebServer/Documents/matt/nhrc/'
f = csv.writer(open(nhdir+"scf_data.csv", "wb+"))

# Write CSV Header, If you dont need that, remove this line
f.writerow(["id", "lat", "lng", "status", "summary", "rating", "description", "created_at", "updated_at", "acknowledged_at", "closed_at"])

for x in json_data["issues"]:
    #print(x["id"], x["summary"], x["created_at"], x["closed_at"])
    f.writerow([unicode(x["id"]), 
                x["lat"], 
                x["lng"], 
                x["status"],
                unicode(x["summary"]),
                unicode(x["description"]),
                x["rating"],
                x["created_at"],
                x["updated_at"],
                x["acknowledged_at"],
                unicode(x["closed_at"]).replace("\r", " ").replace("\n", " ").replace("\t", '').replace("\"", "")
             ])


