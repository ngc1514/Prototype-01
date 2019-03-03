# this is the server file

from flask import Flask, render_template
import backEnd
import json

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html') # render a template


@app.route('/game')
def home():
    return render_template('camera.html') # render a template


# change this into flask
# flask, read request body decode things
@post('/register')
def register_player_info():
    content = bottle.request.body.read().decode() # this is in bottle
    content = json.loads(content)
    backEnd.registerPlayer(content)

# update the player data
@post('/update')
def update_player():
    content = bottle.request.body.read().decode() # this is in bottle
    content = json.loads(content)
    backEnd.update_player(content)