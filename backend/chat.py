from gemini.inference import gemini_upload, gemini_chat, gemini_chat_stream

import tempfile

# Function to check if the uploaded file is allowed (only PDF files)
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'pdf'}


def get_temp_file_path(file):
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        # if hasattr(file, 'chunks'):
        #     for chunk in file.chunks():
        #         temp_file.write(chunk)
        # else:
        temp_file.write(file.read())
        temp_file_path = temp_file.name

    return temp_file_path

def file_upload(file):
    # files = get_temp_file_path(files)
    file_path = get_temp_file_path(file)
    print(file, '----file_upload----')
    return gemini_upload(file_path)


def chat(question, stream):
    if stream:
        responses = gemini_chat_stream(question)
    else:
        responses = gemini_chat(question)
    return responses
