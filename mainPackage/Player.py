#A Player class. For later use probably.

import sys

class Player:
    def __init__(self, name, HP, is_alive):
        self.name = name
        self.HP = 100
        self.is_alive = True

    def spawn(self):
        self.HP = 100

    def die(self):
        self.HP = 0
        self.is_alive = False

testPlayer1 = Player("John", 100, True)
print("Player: " + testPlayer1.name + " has joined the game")
testPlayer1.spawn()
print("Player's HP: " + str(testPlayer1.HP))
print("Player's status: " + str(testPlayer1.is_alive))
print("Player: " + testPlayer1.name + " died")
testPlayer1.die()
print("Player's HP: " + str(testPlayer1.HP))
print("Player's status: " + str(testPlayer1.is_alive))

