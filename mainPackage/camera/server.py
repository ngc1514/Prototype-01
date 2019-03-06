# this is the server file

from flask import Flask, render_template
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
def register_player_info():
    content = Flask.request.data
    content = json.loads(content)
    backEnd.registerPlayer(content)


# update the player data. will fix it later
@app.route('/update', methods=['POST'])
def update_player():
    # content = Flask.request.get_date()
    # content = json.loads(content)
    # backEnd.update_player(content, "playerInfo.json")
    return ''


if __name__ == '__main__':
    app.run(debug=True)  # host='127.0.0.1')

