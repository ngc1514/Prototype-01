import unittest

import backEnd
import json

class UnitTesting(unittest.TestCase):
    def setUp(self):
        pass

    def testRegister(self):
        with open("testRegisterJson.json") as f:
            originalJson = json.load(f)
        with open("varifyRegister.json") as f:
            expectedJsonStr = json.load(f)
        testJson = {
            "playerID": "shesky17",
            "playerHP": 9999,
            "currentLoc": [0, 0],
            "isAlive": True
        }
        backEnd.registerPlayer(testJson, "testRegisterJson.json")
        with open("testRegisterJson.json") as f:
            registered = json.load(f)

        print("The original data: "+ str(originalJson))
        print("The registered data: " + str(registered))
        print("The expected data: " + str(expectedJsonStr))

        self.assertTrue(str(registered) == str(expectedJsonStr))

        # reset data after testing
        defaultJson = {"players": []}
        with open("testRegisterJson.json", "w") as f:
            json.dump(defaultJson, f)
        with open("testRegisterJson.json") as f:
            resetData = json.load(f)
        print("Now resetting the data: " + "\n" + str(resetData))


if __name__ == '__main__':
    unittest.main()