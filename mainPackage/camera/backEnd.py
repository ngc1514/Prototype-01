# this is going to be the shitty backend stuff
import json

# initialize and add a new player to allPlayers.json
def registerPlayer(newPlayerInfo):
    with open("allPlayers.json") as f:
        data = json.loads(f)
        data['players'].append(newPlayerInfo)


# update the player information
def update_player(playerInfo):
    with open("allPlayers.json") as f:
        return ''
    return ''