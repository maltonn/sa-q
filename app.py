import os
from flask import *
app = Flask(__name__,template_folder='.')

@app.route('/start')
def just_call():
    return 'connected'

@app.route('/input', methods=['GET', 'POST'])
def input():
    if request.method == 'GET':
        return render_template('input/index.html')

@app.route('/table', methods=['GET', 'POST'])
def table():
    if request.method == 'GET':
        return render_template('table/index.html')


    

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login/index.html')

@app.route('/resister', methods=['GET', 'POST'])
def resister():
    if request.method == 'GET':
        return render_template('resister/index.html')

if __name__ == '__main__':
    app.run()
    port = int(os.getenv('PORT', 5000))