import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():

    names = []
    logos = []
    seasons = []

    url = "https://api-football-v1.p.rapidapi.com/v2/leagues/country/england/2019"


    headers = {
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
        #api key
        'x-rapidapi-key': ""
        }

    response = requests.request("GET", url, headers=headers )

    result = response.json()

    leagues = result['api']['leagues']

    for league in leagues:
        names.append(league['name'])
        logos.append(league['logo'])
        seasons.append(league['season'])
    
    return render_template("lander.html", names = names, logos = logos, seasons = seasons)

# Route for navbar for each league

@app.route('/<string:name>/fixtures')
def dis_fix(name):

    return render_template("fixture.html", name = name)

@app.route('/<string:name>/standings')
def dis_stand(name):
    
    return render_template("standings.html", name = name)

# Route for fixtures

@app.route('/fixtures', methods = ['POST'])
def fixtures_func():

    league_name = request.form.get('league')

    url = "https://api-football-v1.p.rapidapi.com/v2/leagues/country/england/2019"


    headers = {
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
        #api key
        'x-rapidapi-key': ""
        }

    response = requests.request("GET", url, headers=headers )

    result = response.json()

    leagues = result['api']['leagues']

    for league in leagues:
        if league['name'] == league_name :
            league_id = league['league_id']
            break
    
    url = "https://api-football-v1.p.rapidapi.com/v2/fixtures/league/" +str(league_id)+ "/last/10"

    headers = {
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
        #api key
        'x-rapidapi-key': ""
        }

    response = requests.request("GET", url, headers=headers)

    resultlast = response.json()

    url = "https://api-football-v1.p.rapidapi.com/v2/fixtures/league/" +str(league_id)+ "/next/10"

    headers = {
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
        #api key
        'x-rapidapi-key': "#api key"
        }

    response = requests.request("GET", url, headers=headers)

    if response.status_code!=200:
        return jsonify({"success":False, "message":"Failure to get league id", "leag":league_name, "league":league_id, "url":str(url)})


    resultnext = response.json()

    return jsonify({ "success": True, "url": str(url) , "resultlast": resultlast, "resultnext": resultnext})

    



@app.route('/standings', methods = ['POST'])
def standing_func():
    

    league_name = request.form.get('league')

    url = "https://api-football-v1.p.rapidapi.com/v2/leagues/country/england/2019"


    headers = {
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
        #api key
        'x-rapidapi-key': ""
        }

    response = requests.request("GET", url, headers=headers )

    result = response.json()

    leagues = result['api']['leagues']

    for league in leagues:
        if league['name'] == league_name :
            league_id = league['league_id']
            break


    url1 = "https://api-football-v1.p.rapidapi.com/v2/leagueTable/" + str(league_id)

    headers = {
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
        #api key
        'x-rapidapi-key': ""
        }

    response = requests.request("GET", url1, headers=headers)

    if response.status_code!=200:
        return jsonify({"success":False, "message":"Failure to get league id", "leag":league_name, "league":league_id, "url":str(url1)})


    result = response.json()

    return jsonify({ "success": True, "result": result})



    
if __name__== '__main__':
    app.run()