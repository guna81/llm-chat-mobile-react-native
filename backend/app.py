from flask import Flask, request, jsonify
from chat import load_documents, chat

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def index():
    return "Hello, World!"


@app.route("/load-docs", methods=["POST"])
def load_docs_api():
    try:
        # Get user message from the request body
        files = request.files['files']
        result = load_documents(files)

        return jsonify({
            "data": result
        }), 200
    except Exception as e:
        print("error", e)
        return jsonify({
            "error": True
        })

@app.route("/qa", methods=["POST"])
def chat_api():
    try:
        # Get user message from the request body
        question = request.form['question']
        result = chat(question)
        
        return jsonify({
            "data": result
        }), 200
    except Exception as e:
        print("error", e)
        return jsonify({
            "error": True
        })
    

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=8080)