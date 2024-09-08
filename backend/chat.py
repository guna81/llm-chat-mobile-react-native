from gemini.inference import gemini_upload, gemini_chat

def file_upload(files):
    # files = get_temp_file_path(files)
    print(files, '----file_upload----')
    gemini_upload(files)


def chat(question):
    print('----inference----')
    responses = gemini_chat(question)
    return responses
