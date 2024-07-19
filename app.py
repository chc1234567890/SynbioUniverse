from flask import Flask, render_template
 
app = Flask(__name__)
 

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/edit')
def gameedit():
    return render_template("edit/edit.html")

@app.route('/2048')
def game2048():
    return render_template("2048/2048.html")
 
 
if __name__ == '__main__':
    app.run(debug=True)