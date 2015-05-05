''' This library generates a random alphanumeric code of specified length  '''

import random

def generate_random_code(length = 12):
	''' This function generates a random alphanumeric string. 
	It randomly chooses from the alphabet and the numbers 0 - 99.
	If no argument is given, the function will pick random alphanumerics 12 times. '''
	digits_letters = ['qwertyuiopasdfghjklzxcvbnm'.upper(), range(100)]
	
	random_code = ''
	count = 0
	
	while count < length:
		random_code = '{}{}'.format(random_code, random.choice(random.choice(digits_letters)))
		count += 1
	return random_code
