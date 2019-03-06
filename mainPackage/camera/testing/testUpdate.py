import unittest

import backEnd
import json

class UnitTesting(unittest.TestCase):
    def setUp(self):
        pass

    def testUpdate(self):
        # will change shesky17 hp to 9999
        with open("testUpdateJson.json") as f:
            originalJson = json.load(f)
        with open("varifyJson.json") as f:
            expectedJsonStr = json.load(f)
        testJson = {
                    "playerID": "shesky17",
                    "playerHP": 9999,
                    "currentLoc": [0, 0],
                    "isAlive": True
                    }
        backEnd.update_player(testJson, "testUpdateJson.json")
        with open("testUpdateJson.json") as f:
            updated = json.load(f)

        print("The original data: "+ str(originalJson))
        print("The updated data: " + str(updated))
        print("The expected data: " + str(expectedJsonStr))

        if(str(updated) == str(expectedJsonStr)):
            self.assertTrue(str(updated) == str(expectedJsonStr))
            print("Passed.")

        # reset data after testing
        defaultJson = {"players": [{"playerID": "admin", "playerHP": 1, "currentLoc": [111, 111], "isAlive": True}, {"playerID": "shesky17", "playerHP": 2, "currentLoc": [0, 0], "isAlive": True}]}
        with open("testUpdateJson.json", "w") as f:
            json.dump(defaultJson, f)
        with open("testUpdateJson.json") as f:
            resetData = json.load(f)
        print("Now resetting the data: " + "\n" + str(resetData))


if __name__ == '__main__':
    unittest.main()