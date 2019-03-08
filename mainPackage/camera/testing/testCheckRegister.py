import unittest

import backEnd
import json


class UnitTesting(unittest.TestCase):
    def setUp(self):
        pass

    def testCheckRegister(self):
        with open("testDatabase/varifyRegister.json") as f:
            initialized = json.load(f)

        print("The data is: " + str(initialized))

        checkName = "shesky17"

        self.assertTrue(backEnd.checkRegister(checkName, "testDatabase/varifyRegister.json"))


if __name__ == '__main__':
    unittest.main()

