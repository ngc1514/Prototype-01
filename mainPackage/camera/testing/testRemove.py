import unittest

import backEnd
import json

class UnitTesting(unittest.TestCase):
    def setUp(self):
        pass

    def testRemove(self):
        with open("testRemoveJson.json") as f:
            originalJson = json.load(f)
        with open("varifyRemove.json") as f:
            expectedJsonStr = json.load(f)
        testName = "shesky17"
        backEnd.removePlayer(testName, "testRemoveJson.json")
        with open("testRemoveJson.json") as f:
            removed = json.load(f)

        print("The original data: "+ str(originalJson))
        print("The removed data: " + str(removed))
        print("The expected data: " + str(expectedJsonStr))

        self.assertTrue(str(removed) == str(expectedJsonStr))

        # reset data after testing
        defaultJson = {"players": [{"playerID": "admin", "playerHP": 1, "currentLoc": [111, 111], "isAlive": True}, {"playerID": "shesky17", "playerHP": 2, "currentLoc": [0, 0], "isAlive": True}]}
        with open("testRemoveJson.json", "w") as f:
            json.dump(defaultJson, f)
        with open("testRemoveJson.json") as f:
            resetData = json.load(f)
        print("Now resetting the data: " + "\n" + str(resetData))


if __name__ == '__main__':
    unittest.main()