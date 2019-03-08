import unittest

import backEnd
import json


class UnitTesting(unittest.TestCase):
    def setUp(self):
        pass

    def testInitalize(self):
        with open("testDatabase/varifyInit.json") as f:
            expectedJsonStr = json.load(f)

        with open("testDatabase/testInitialJson.json") as f:
            initialized = json.load(f)

        backEnd.initializeData("testDatabase/testInitialJson.json")

        print("The initialized data: " + str(initialized))
        print("The expected data: " + str(expectedJsonStr))

        self.assertTrue(str(initialized) == str(expectedJsonStr))

        # reset data after testing
        defaultJson = {}
        with open("testDatabase/testInitialJson.json", "w") as f:
            json.dump(defaultJson, f)
        with open("testDatabase/testInitialJson.json") as f:
            resetData = json.load(f)
        print("Now resetting the data: " + "\n" + str(resetData))


if __name__ == '__main__':
    unittest.main()
