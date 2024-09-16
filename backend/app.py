from flask import Flask, request, jsonify, Response
from chat import file_upload, chat

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def index():
    return "Hello, World!"


@app.route("/file-upload", methods=["POST"])
def file_upload_api():
    try:
        files = request.files['file']
        result = file_upload(files)

        return jsonify({
            "success": True
        }), 200
    except Exception as e:
        print("error", e)
        return jsonify({
            "success": True
        }), 500

@app.route("/chat", methods=["POST"])
def chat_api():
    try:
        # Get user message from the request body
        message = request.json.get('message')
        stream = request.json.get('stream', False)

        result = chat(message, stream)

        if stream:
            return Response(result, mimetype='application/json')
        else:
            return jsonify({
                "data": result
            }), 200
    except Exception as e:
        print("error", e)
        return jsonify({
            "success": False
        }), 500
    

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)