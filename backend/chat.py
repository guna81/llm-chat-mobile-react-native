from gemini.inference import gemini_upload, gemini_chat, gemini_chat_stream

def file_upload(files):
    # files = get_temp_file_path(files)
    print(files, '----file_upload----')
    gemini_upload(files)


def chat(question, stream):
    if stream:
        responses = gemini_chat_stream(question)
    else:
        responses = gemini_chat(question)
    return responses
