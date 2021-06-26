#ローカルでのテスト用
import os
from flask import *
app = Flask(__name__, static_folder='.', template_folder='./')
print(app.static_folder)
print([x.strip() for x in os.listdir(app.static_folder)])
@app.route('/start')
def just_call():
    return 'connected'

@app.route('/')
def Main():
    if request.method == 'GET':
        return render_template('index.html')

@app.route('/input')
def Input():
    if request.method == 'GET':
        return render_template('input/index.html')

@app.route('/table')
def Table():
    if request.method == 'GET':
        return render_template('table/index.html')

if __name__ == '__main__':
    app.run()
    port = int(os.getenv('PORT', 5000))
