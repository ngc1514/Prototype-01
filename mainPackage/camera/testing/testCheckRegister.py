import unittest

import backEnd
import json


class UnitTesting(unittest.TestCase):
    def setUp(self):
        pass

    def testCheckRegister(self):
        with open("varifyRegister.json") as f:
            initialized = json.load(f)

        print("The data is: " + str(initialized))

        self.assertTrue(backEnd.checkRegister("shesky17", "varifyRegister.json"))


if __name__ == '__main__':
    unittest.main()

