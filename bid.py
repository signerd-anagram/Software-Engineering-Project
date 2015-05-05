''' This library models a bid during an auction '''
import datetime

from database import *
from user import *
from item import *

DB = DATABASE

class Bid(Model):
	username = ForeignKeyField(User, related_name = "bids")
	item = ForeignKeyField(Item, related_name = "bidders")
	amount = DoubleField()
	date_of_bidding = DateField(default = datetime.datetime.now)
	
	class Meta:
		database = DB
		order_by = ('-amount', )
	
	@classmethod
	def make_bid(cls, **kwargs):
		Bid.create(**kwargs)

def stop_bid(item_code):
	bought_item = Item.get(Item.code == item_code)
	bought_item.bought = True
	bought_item.save()

if  __name__ == "__main__":
	DB.connect()
	DB.create_tables([Bid])
		
