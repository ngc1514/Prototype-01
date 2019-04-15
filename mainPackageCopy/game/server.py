# this is the server file

from flask import Flask, render_template, request
import backEnd
import json

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')  # render a template


@app.route('/game')
def home():
    return render_template('game.html')  # render a template


# flask, read request body decode things
# Nick and Jake will finish this part
# Fix AttributeError: type object 'Flask' has no attribute 'request'
@app.route('/register', methods=['POST'])
def registerPlayer_info():
    content = request.get_data().decode()
    # content = json.loads(content)
    backEnd.registerPlayer(content, 'playerInfo.json')
    return content


# update the player data. will fix it later
@app.route('/update', methods=['POST'])
def updatePlayer():
    content = request.data
    content = json.loads(content)
    backEnd.update_player(content, "playerInfo.json")
    return ''


@app.route('/remove', methods=['POST'])
def removePlayer():
    content = request.get_data().decode()
    # content = json.loads(content)
    backEnd.removePlayer(content, "playerInfo.json")
    return content


@app.route('/players', methods=['GET'])
def showPlayers():
    with open("playerInfo.json") as f:
        obj = json.load(f)
    return json.dumps(obj)


if __name__ == '__main__':
    app.run(debug=True)  # host='127.0.0.1')

