import json
import urllib2
import csv
import pandas as pd

#jq = jq.bake('-M')  # disable colorizing
#json_data = json.load(urllib2.urlopen('https://seeclickfix.com/api/v2/issues?page=1&per_page=10&status=closed'))
json_data = json.load(urllib2.urlopen('https://seeclickfix.com/api/v2/issues?address="New%20Haven"&page=1&per_page=100'))

df = pd.read_json(json.loads(json_data))