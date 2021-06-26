import os
from flask import *
app = Flask(__name__)
@app.route('/start')
def just_call():
    return 'connected'

@app.route('/', methods=['GET', 'POST'])
def Main():
    if request.method == 'GET':
        return render_template('login.html')

    
@app.route('/home', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        return render_template('home.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')

@app.route('/user', methods=['GET', 'POST'])
def profile():
    if request.method == 'GET':
        return render_template('user.html')


@app.route('/user-settings', methods=['GET', 'POST'])
def user_settings():
    if request.method == 'GET':
        return render_template('user-settings.html')

@app.route('/event', methods=['GET', 'POST'])
def event_details():
    if request.method == 'GET':
        return render_template('event-details.html')
        
@app.route('/event-resister', methods=['GET', 'POST'])
def event_resister():
    if request.method == 'GET':
        return render_template('event-resister.html')

@app.route('/friends', methods=['GET', 'POST'])
def friends():
    if request.method == 'GET':
        return render_template('friends.html')


if __name__ == '__main__':
    app.run()
    port = int(os.getenv('PORT', 5000))

