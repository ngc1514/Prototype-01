# this is going to be the backend stuff
import json


def initializeData(filename):
    with open(filename, 'w') as f:
        jsonData = {"players": []}
        json.dump(jsonData, f)


# add a new player to testData.json
# newPlayerInfo is a json string
def registerPlayer(playerName, filename):
    obj = ''
    with open(filename) as f:
        newData = {
            "playerID": playerName,
            "playerHP": 2,
            "currentLoc": [0, 0],
            "isAlive": True
        }
        obj = json.load(f)
        obj['players'].append(newData)
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


# when a player quit the game
def removePlayer(playerName, filename):
    with open(filename) as f:
        obj = json.load(f)
        for idx, info in enumerate(obj['players']):
            if info['playerID'] == playerName:
                del obj['players'][idx]
        with open(filename, 'w') as f:
            json.dump(obj, f)


# # return true if player already registered
# def checkRegister(inputID, filename):
#     isIn = False
#     with open(filename) as f:
#         obj = json.load(f)
#         playerDicts = obj['players']
#         for info in playerDicts:
#             if(inputID == info['playerID']):
#                 isIn = True
#     return isIn


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

