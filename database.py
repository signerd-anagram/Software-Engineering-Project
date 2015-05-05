''' this library defines the database for the online bidding system '''

from peewee import *

DATABASE = SqliteDatabase('online_bidding.db')
