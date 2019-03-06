# this is going to be the backend stuff
import json


def initializeData(filename):
    with open(filename, 'w') as f:
        jsonData = {"players": []}
        json.dump(jsonData, f)


# initialize and add a new player to testData.json
# newPlayerInfo is a json string
def registerPlayer(newPlayerInfo, filename):
    obj = ''
    with open(filename) as f:
        obj = json.load(f)
        obj['players'].append(newPlayerInfo)
    print(obj)
    with open(filename, 'w') as f:
        json.dump(obj, f)


# update the player information
# the player must be in the the database already
# playerInfo is a dict
def updatePlayer(playerInfo, filename):
    with open(filename) as f:
        obj = json.load(f)
        for info in obj['players']:
            if info['playerID'] == playerInfo['playerID']:
                info['playerHP'] = playerInfo['playerHP']
                info['currentLoc'] = playerInfo['currentLoc']
                info['isAlive'] = playerInfo["isAlive"]
            else:
                print("Not this player: " + info['playerID'])
        with open(filename, 'w') as f:
            json.dump(obj, f)


def removePlayer(playerInfo, filename):
    with open(filename) as f:
        obj = json.load(f)
        for idx, info in enumerate(obj['players']):
            if info['playerID'] == playerInfo['playerID']:
                del obj['players'][idx]
        with open(filename, 'w') as f:
            json.dump(obj, f)


# initializeData()
# test1 = {
#             "playerID": "testDummy",
#             "playerHP": 555,
#             "currentLoc": [0, 0],
#             "isAlive": True
#             }
# registerPlayer(test1)
# overwrite = {
#     "playerID": "shesky17",
#     "playerHP": 1000000,
#     "currentLoc": [111, 111],
#     "isAlive": True
# }
# update_player(overwrite, "playerInfo.json")
#
# with open("playerInfo.json") as f:
#     obj = json.load(f)
#     print("now the json file is: " + "\n" + str(obj))

