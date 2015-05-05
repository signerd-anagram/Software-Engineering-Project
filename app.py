import json
import datetime

from flask import Flask, render_template, request, redirect, url_for, flash, make_response
from werkzeug import secure_filename
from user import *
from item import *
from bid import *
from message import *

UPLOAD_FOLDER = '/static/imgs'
ALLOWED_EXTENSIONS = set(['jpg', 'png', 'jpeg', 'gif'])

app = Flask(__name__)
app.secret_key = 'hiohsfnvoshfvsnvsdjvpsdvsdv//,/vsovsdv;dvsdv0mdvs0-vmosdv0vmdsv'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
	return '.' in filename and \
	filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS
	
@app.route('/upload')	
def upload_file():
	if request.method == 'POST':
		file = request.files['file']
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
	
		return redirect(url_for())

def greet_user():
	try:
		message = 'LOGOUT {}'.format(json.loads(request.cookies.get('username')).upper())
		url = "/state?state=out"
	except TypeError:
		message = 'SIGN IN'
		url = "/state?state=in"
	finally:
		return [message, url]

@app.route('/administrator', methods = ['POST'])
@app.route('/admin', methods = ['POST'])
def admin():
	if request.form.items():
		message = dict(request.form.items())['message']
		auctioneer = json.loads(dict(request.cookies.items())['username'])
		Message.create_message(message = message, auctioneer = auctioneer )
	return render_template('/admin.html', items = Item.select(), Item = Item, users = User.select(), message = greet_user())

@app.route('/')
@app.route('/home')
def index():
	greet_user()	
	return render_template('/home.html', items = Item.select().where(Item.bought == False), message = greet_user(), updates = Message.select())

@app.route('/profile', methods = ['POST', 'GET'])
def profile():
	if request.form.items():
		username = dict(request.form.items())['username']
		return render_template('/profile.html', user = User.get(User.username == username), message = greet_user())


@app.route('/sign up form')
def sign_up():
	greet_user()
	return render_template('/sign_up.html', items = Item.select().where(Item.bought == False), message = greet_user())

@app.route('/sign up', methods = ['POST'])
def create_new_user():
	greet_user()
	if request.form.items():
		username = dict(request.form.items())['username']
		email = dict(request.form.items())['email']
		password = dict(request.form.items())['password']
		national_id = dict(request.form.items())['national_id']
		phone_number = dict(request.form.items())['phone_number']
	
		User.create_user(username = username, email = email, password = password, national_id = national_id, phone_number = phone_number)
		flash('You have been signed up!')
	
	return redirect(url_for('index'))

@app.route('/sign in', methods = ['POST', 'GET'])
def sign_in(user_request = "in"):
	greet_user()
	if request.form.items():
		username = dict(request.form.items())['username']
		password = dict(request.form.items())['password']
		
		try:
			db_password = User.get(User.username == username).password
			
			if password == db_password:
				response = make_response(redirect(url_for('index')))
				response.set_cookie('username', json.dumps(username))	
				
				if User.get(User.username == username).is_admin == True	:
					response = make_response(redirect(url_for('admin')))
					response.set_cookie('username', json.dumps(username))	
					return response
				else:
					response = make_response(redirect(url_for('index')))
					response.set_cookie('username', json.dumps(username))	
					return response
			else:
				raise DoesNotExist('Invalid login')
				return render_template('/sign_in.html', items = Item.select().where(Item.bought == False), message = greet_user())

		except DoesNotExist:
			flash('Invalid login', category = 'login_error')
			return render_template('/sign_in.html', items = Item.select().where(Item.bought == False), message = greet_user())
		
		except TypeError:
			pass
		except ValueError:
			pass
	else:
		return render_template('/sign_in.html', items = Item.select().where(Item.bought == False), message = greet_user())

@app.route('/gallery')
@app.route('/auctions')
def gallery():
	greet_user()
	return render_template('/gallery.html', items = Item.select().where(Item.bought == False), message = greet_user() )

@app.route('/item', methods = ['POST', 'GET'])
def item(**kwargs):
	greet_user()
	item_code = request.args.get('code')
	new_selected_item = Item.get(Item.code == item_code)
	
	try:
		if request.form.items():
			bid = ((dict(request.form.items())['bid']))
		
			if bid > new_selected_item.price:
				new_selected_item.highest_bid = bid
				new_selected_item.buyer = json.loads(request.cookies.get('username'))
				new_selected_item.save()
				Bid.make_bid(username = json.loads(request.cookies.get('username')),
							 item = item_code,
							 amount = bid)
		
			return render_template('/item.html', items = Item.select().where(Item.bought == False), message = greet_user(), selected_item = new_selected_item, bids = Bid.select().where(Bid.item == item_code))
		else:
			return render_template('/item.html', items = Item.select().where(Item.bought == False), message = greet_user(), selected_item = Item.get(Item.code == item_code), bids = Bid.select().where(Bid.item == item_code))
	except ValueError:
		return render_template('/item.html', items = Item.select().where(Item.bought == False), message = greet_user(), selected_item = Item.get(Item.code == item_code), bids = Bid.select().where(Bid.item == item_code))
	except TypeError:
		flash('You must be signed in first. SIGN IN or SIGN UP', category = "sign_in_first")
		return render_template('/item.html', items = Item.select().where(Item.bought == False), message = greet_user(), selected_item = Item.get(Item.code == item_code), bids = Bid.select().where(Bid.item == item_code))

@app.route('/submit item', methods = ['POST', 'GET'])
def submit_item():
	greet_user()
	try:
		if request.form.items():
			name = dict(request.form.items())['name']
			description = dict(request.form.items())['description']
			price = dict(request.form.items())['price']
			image_url = dict(request.form.items())['image_url']
		
			Item.create_item(name = name, 
							 description = description, 
							 price = price, 
							 seller = json.loads(request.cookies.get('username')), 
							 date_submitted = datetime.datetime.now(), 
							 image_url = image_url)
								 
			flash('Item added', category = 'submit_item')
			redirect(url_for('submit_item'))
		
		return render_template('submit_item.html', items = Item.select().where(Item.bought == False), message = greet_user())
	except TypeError:
		flash('You must be signed in first. SIGN IN or SIGN UP', category = "sign_in_first")
		return render_template('submit_item.html', items = Item.select().where(Item.bought == False), message = greet_user())

@app.route('/contact')
@app.route('/advertise')
def contact():
	greet_user()
	return render_template('contact.html', items = Item.select().where(Item.bought == False), message = greet_user())

@app.route('/stop', methods = ['POST'])
def stop():
	item_code = request.args.get('item_code')
	stop_bid(item_code)
	return redirect(url_for('admin'))
	
@app.route('/state', methods = ['POST', 'GET'])
def in_out(state = 'in'):
	state = request.args.get('state')
	
	if state == 'in':
		return redirect(url_for('sign_in'))
	else:
		response = make_response(redirect(url_for('index')))
		response.set_cookie('username', expires = 0)
		return response

@app.route('/faq')
def faq():
	greet_user()
	return render_template('faq.html', items = Item.select().where(Item.bought == False), message = greet_user())

app.run(debug = True, host = '127.0.0.1', port = 8000)
