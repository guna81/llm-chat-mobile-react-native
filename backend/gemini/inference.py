
import os
from dotenv import load_dotenv

import time
import json

import google.generativeai as genai

from .config import generation_config

load_dotenv()  # take environment variables from .env.

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

def upload_to_gemini(path, mime_type=None):
  """Uploads the given file to Gemini.

  See https://ai.google.dev/gemini-api/docs/prompting_with_media
  """
  file = genai.upload_file(path, mime_type=mime_type)
  print(f"Uploaded file '{file.display_name}' as: {file.uri}")
  return file

def wait_for_files_active(files):
  """Waits for the given files to be active.

  Some files uploaded to the Gemini API need to be processed before they can be
  used as prompt inputs. The status can be seen by querying the file's "state"
  field.

  This implementation uses a simple blocking polling loop. Production code
  should probably employ a more sophisticated approach.
  """
  print("Waiting for file processing...")
  for name in (file.name for file in files):
    file = genai.get_file(name)
    while file.state.name == "PROCESSING":
      print(".", end="", flush=True)
      time.sleep(10)
      file = genai.get_file(name)
    if file.state.name != "ACTIVE":
      raise Exception(f"File {file.name} failed to process")
  print("...all files ready")

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
)

history = [
]

# chat_session = model.start_chat(history=history)

def gemini_upload(file):
  # TODO Make these files available on the local file system
  # You may need to update the file paths
  files = [
    upload_to_gemini(file, mime_type="application/pdf"),
  ]

  # Some files have a processing delay. Wait for them to be ready.
  wait_for_files_active(files)

  history.append({"role": "user", "parts": [files[0]]})
  
  # Update the chat session with the new history
  chat_session = model.start_chat(history=history)

  return files


def gemini_chat(message):
  chat_session = model.start_chat(history=history)

  response = chat_session.send_message(message)

  history.append({"role": "user", "parts": [message]})
  history.append({"role": "model", "parts": [response.text]})
    
  # # Update the chat session with the new history
  chat_session = model.start_chat(history=history)

  return response.text


def gemini_chat_stream(message):
  response = chat_session.send_message(message, stream=True)
  
  for chunk in response:
    data = json.dumps({
      "data": chunk.text
    })
    yield data