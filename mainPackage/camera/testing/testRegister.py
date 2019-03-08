import unittest

import backEnd
import json

class UnitTesting(unittest.TestCase):
    def setUp(self):
        pass

    def testRegister(self):
        with open("testDatabase/testRegisterJson.json") as f:
            originalJson = json.load(f)
        with open("testDatabase/varifyRegister.json") as f:
            expectedJsonStr = json.load(f)
        testID = "shesky17"
        backEnd.registerPlayer(testID, "testDatabase/testRegisterJson.json")
        with open("testDatabase/testRegisterJson.json") as f:
            registered = json.load(f)

        print("The original data: "+ str(originalJson))
        print("The registered data: " + str(registered))
        print("The expected data: " + str(expectedJsonStr))

        self.assertTrue(str(registered) == str(expectedJsonStr))

        # reset data after testing
        defaultJson = {"players": []}
        with open("testDatabase/testRegisterJson.json", "w") as f:
            json.dump(defaultJson, f)
        with open("testDatabase/testRegisterJson.json") as f:
            resetData = json.load(f)
        print("Now resetting the data: " + "\n" + str(resetData))


if __name__ == '__main__':
    unittest.main()