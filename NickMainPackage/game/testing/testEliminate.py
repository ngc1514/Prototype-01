import unittest

import backEnd
import json


class UnitTesting(unittest.TestCase):
    def setUp(self):
        pass

    def testEliminate(self):
        with open("testDatabase/varifyEliminate.json") as f:
            expectedJsonStr = json.load(f)

        testJson = {
            "playerID": "shesky17",
            "playerHP": 0,
            "currentLoc": [0, 0],
            "isAlive": True
        }
        backEnd.eliminate(testJson, "testDatabase/testEliminate.json")

        with open("testDatabase/testEliminate.json") as f:
            eliminated = json.load(f)

        print("The eliminated data: " + str(eliminated))
        print("The expected data: " + str(expectedJsonStr))

        print(str(eliminated) == str(expectedJsonStr))

        # reset data after testing
        defaultJson = {"players": [{"playerID": "shesky17", "playerHP": 2, "currentLoc": [0, 0], "isAlive": True}]}
        with open("testDatabase/testEliminate.json", "w") as f:
            json.dump(defaultJson, f)
        with open("testDatabase/testEliminate.json") as f:
            resetData = json.load(f)
        print("Now resetting the data: " + "\n" + str(resetData))


if __name__ == '__main__':
    unittest.main()
