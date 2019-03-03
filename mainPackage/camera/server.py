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
@app.route('/register', methods=['POST'])
def register_player_info():
    content = Flask.request.data # this is in bottle
    content = json.loads(content)
    backEnd.registerPlayer(content)


# update the player data
@app.route('/update', methods=['POST'])
def update_player():
    content = Flask.request.data
    content = json.loads(content)
    backEnd.update_player(content)