# this is going to be the backend stuff
import json


def initializeData():
    with open("playerInfo.json", 'w') as f:
        jsonData = {"players" : []}
        json.dump(jsonData, f)


# initialize and add a new player to testData.json
# newPlayerInfo is a json string
def registerPlayer(newPlayerInfo):
    obj = ''
    with open("playerInfo.json") as f:
        obj = json.load(f)
        obj['players'].append(newPlayerInfo)
    print(obj)
    with open('testData.json', 'w') as f:
        json.dump(obj, f)


# update the player information
# playerInfo is a json string
def update_player(playerInfo):
    with open("playerInfo.json") as f:
        obj = json.load(f)
        for info in obj['players']:
            if info['playerID'] == playerInfo['playerID']:
                info['playerHP'] = playerInfo['playerHP']
                info['currentLoc'] = playerInfo['currentLoc']
                info['isAlive'] = playerInfo["isAlive"]
        with open('testData.json', 'w') as f:
            json.dump(obj, f)

# initializeData()
# test1 = {
#             "playerID": "test",
#             "playerHP": 555,
#             "currentLoc": [0, 0],
#             "isAlive": True
#             }
# registerPlayer(test1)
# overwrite = {
#     "playerID": "admin",
#     "playerHP": 1,
#     "currentLoc": [111, 111],
#     "isAlive": True
# }
# update_player(overwrite)
#
# with open("testData.json") as f:
#     obj = json.load(f)
#     print(obj)

