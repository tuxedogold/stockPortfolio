import requests
import json
import csv

payload = {
"apikey" : "demo", #change this to your appropriate API Key, demo will work for AAPL but not others
"stocks" :{
            "AAPL" : 30,
            "CAKE" : 2,
            "GOOG" : 1
            },
"datefrom" : "2020-01-01"
}

jsonheaders = {'Content-type': 'application/json', 'Accept': 'text/plain'}

url = 'http://localhost:3000/portfolio'

response = requests.post(url, data=json.dumps(payload),headers = jsonheaders)

portfolio = json.loads(response.content)["portfolio"] 

with open("portfolio.csv","w+",newline='') as portfoliofile: #newline argument prevents double spacing
    csvWriter = csv.writer(portfoliofile,delimiter=',')
    csvWriter.writerows(portfolio)
