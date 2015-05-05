''' This library defines the item class for the online bidding system and it attributes and methods '''
import datetime
import random

from database import *
from user import *
from flask import request
import random_code

DB = DATABASE


class Item(Model):
	''' This defines the model for item in the online bidding system '''
	code = CharField(max_length = 100, unique = True, primary_key = True)
	name = CharField()
	description = TextField()
	price = DoubleField()
	seller = ForeignKeyField(User, to_field = 'username', related_name = 'items_sold')
	buyer = ForeignKeyField(User, to_field = 'username', related_name = 'items_bought', null = True)
	date_submitted = DateField(default = datetime.datetime.now)
	image_url = CharField()
	bought = BooleanField(default = False)
	highest_bid = DoubleField(default = 0)
	
	class Meta:
		database = DB
		order_by = ('-date_submitted',)
	
	@classmethod
	def create_item(cls, **kwargs):
		try:
			cls.create(code = random_code.generate_random_code(), **kwargs)
		except IntegrityError:
			cls.create(code = random_code.generate_random_code(int(random.choice(range(20, 31)))), **kwargs)
		#	raise ValueError('Name already exists')

if __name__ == '__main__':
	DB.connect()
	DB.create_tables([Item], safe = True)
