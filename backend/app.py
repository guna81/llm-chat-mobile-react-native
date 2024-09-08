from flask import Flask, request, jsonify
from chat import file_upload, chat

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def index():
    return "Hello, World!"


@app.route("/file-upload", methods=["POST"])
def load_docs_api():
    try:
        files = request.files['files']
        result = file_upload(files)

        return jsonify({
            "data": result
        }), 200
    except Exception as e:
        print("error", e)
        return jsonify({
            "error": True
        })

@app.route("/chat", methods=["POST"])
def chat_api():
    try:
        # Get user message from the request body
        message = request.json['message']
        result = chat(message)
        
        return jsonify({
            "data": result
        }), 200
    except Exception as e:
        print("error", e)
        return jsonify({
            "error": True
        })
    

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)