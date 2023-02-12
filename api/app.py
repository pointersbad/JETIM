from flask      import Flask, request, current_app, jsonify
from .utilities import submit, status
app = Flask(
    __name__,
    static_url_path= '', 
    static_folder  = '../pages'
)

@app.route('/')
def index():
    return current_app.send_static_file('index.tsx')

@app.route('/api/video', methods = ['POST'])
def post_render():
    data  = request.json
    try:
        reply = request(data)

        return jsonify({
            "status":   "Sucess",
            "message":  "OK",
            "data":     {
                "id":       reply.id,
                "message":  reply.message
            }
        })
    except Exception as e:
        return jsonify({
            "status":   "fail",
            "message":  "Bad Request",
            "data":     e
        })

@app.route('/api/video/<id>')
def render(id):
    try:
        reply = status(id).to_dict()

        return jsonify({
            "status":   "success",
            "message":  "OK",
            "data":     {
                "data":     reply.get('data', None),
                "status":   reply.get('status', None),
                "url":      reply.get('url', None)
            }
        })
    except Exception as error:
        return jsonify({
            "status":   "fail",
            "message":  "Bad Request",
            "data":     error
        })
