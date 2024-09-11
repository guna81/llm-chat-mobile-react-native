
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

chat_session = model.start_chat(
  history=[
    # {
    #   "role": "user",
    #   "parts": [
    #     files[0],
    #     "improvise this resume to get more interview calls",
    #   ],
    # },
    # {
    #   "role": "model",
    #   "parts": [
    #     "##  Guna P\n**guna080100@gmail.com | +91 6381-868-258 | Trichy, Tamil Nadu**\n**guna81.com | linkedin.com/in/guna81**\n\n**Summary**\n\nA highly motivated and results-driven Full-Stack developer with 3+ years of experience building and maintaining web and mobile applications using React.js, Next.js, React Native, Django and associated technologies. Proven ability to design, develop, and deploy high-performance, user-friendly applications, leveraging a strong understanding of both front-end and back-end development best practices. Passionate about learning new technologies and contributing to innovative projects.\n\n**Skills**\n\n**Languages:** Javascript, Python, TypeScript, SQL\n**Frameworks & Libraries:** React.js, Next.js, React Native, Django, Django Rest Framework, Redux, Redux Toolkit, LangChain, Material UI, Bootstrap, CSS\n**Tools:** Webpack, Docker, Pandas, Scikit-Learn, Android Studio, Xcode, Git, Heroku, Netlify, VS Code\n**Other:** Agile Development, Test-Driven Development (TDD), RESTful APIs, LLM Integration, Server-Side Rendering (SSR), Progressive Web Apps (PWAs), Mobile App Development, 2FA Implementation, Data Visualization, Error Handling, Performance Optimization,  \n\n**Work Experience**\n\n**Frontend Engineer** | Equipo Health | Trivandrum | Feb 2023 - Present\n\n* Developed and maintained features for a healthcare web application using React and Redux Toolkit, enhancing user experience and functionality.\n* Designed and implemented highly reusable UI components, adhering to React component architecture best practices.\n* Reduced bundle size by 50% through advanced optimization techniques such as tree-shaking and code splitting, resulting in faster load times and improved performance.\n* Enhanced API efficiency by implementing caching mechanisms using Redux Toolkit Query, reducing server resource usage by approximately 40%.\n* Implemented browser cache invalidations by customizing build methods with Webpack, ensuring updated content delivery and optimal application performance.\n* Integrated application error tracking by developing a custom error boundary with sourcemap support, improving debugging and error resolution.\n* Developed RESTful APIs using Django and MySQL to generate application reports, facilitating data analysis and insights.\n\n**Full-Stack Developer** | Looperex Technologies | Trichy | Dec 2020 - Jan 2023\n\n* Developed and maintained high-quality web and mobile applications using React and Django, ensuring high performance and seamless user experience.\n* Transformed design mock-ups into high-quality, efficient React code, enhancing the visual appeal and functionality of the applications.\n* Built admin dashboards for various applications using React and Bootstrap, streamlining user management and data visualization.\n* Significantly reduced load time and improved SEO performance by implementing Static Site Generation (SSG) using Next.js.\n* Integrated HLS player for an online video streaming application, enabling high-quality video playback across multiple devices.\n* Built responsive and interactive Progressive Web Applications (PWAs) to provide a native app-like experience on the web.\n* Developed and deployed Android and iOS applications across various domains using React Native and successfully published them to app stores.\n* Created REST APIs and admin interfaces for e-commerce, OTT, and crypto trading applications, implemented 2FA along with other security features to ensure secure transactions.\n* Built and managed deployment pipelines from Git to Heroku and Netlify, automating deployment processes and enhancing development workflow.\n\n**Project Work**\n\n**LLM Chat Application**\n* Developed an advanced LLM application that allows users to interact with open-source Large Language Models (LLMs) using Ollama APIs, enabling natural language conversations. Integrated retrieval-augmented generation (RAG) capabilities using LangChain, allowing users to ask questions and receive accurate answers directly from relevant documents. Built with React for a responsive user interface and Django for a robust backend, ensuring seamless communication between the front end, LLM models, and document retrieval systems.\n\n**Social Media Application**\n* Developed a feature-rich social media application that enables users to share posts with media files, engage with content through likes and comments, and connect with others via follow requests and friend requests. Implemented real-time messaging functionality, allowing users to chat seamlessly. Leveraged React for a responsive and dynamic user interface and Django for robust backend support.\n\n**Package**\n* **React Speech Input:** Created a lightweight and easy-to-use React package, react-speech-input, that enables speech recognition capabilities for input fields, offering developers a simple API and customization options to adapt to various use cases. \n\n* **React Ticker:** Developed react-ticker, a simple and customizable React component for creating ticker-style news scrollers. The component provides smooth scrolling of text and other content, ideal for displaying breaking news, updates, or any continuously moving content. \n\n**Awards and Certificates**\n\n* Awarded for Ace Performer of the Quarter on Equipo Health.\n* CS50's Introduction to Artificial Intelligence with Python on HarvardX.\n* Data Structures and Algorithms in Python on Jovian.\n* CS50's Web Programming with Python and JavaScript on HarvardX.\n\n**Education**\n\n**Kurinji College of Engineering and Technologies**\nB.E. in Electrical and Electronics Engineering | Aug 2019 - Apr 2022\n\n\n**Key Improvements:**\n\n* **Added a Summary section** to highlight your key skills and experience in a concise manner.\n* **Combined your Skills section:** Grouped skills into categories for better readability and organization.\n* **Enhanced Project Work section:** Provided more detail about the LLM chat application and the Social Media Application, showcasing your technical capabilities and accomplishments.\n* **Expanded the Full-Stack Developer role:** Included more detail about your responsibilities and accomplishments, showcasing your diverse skills and contributions.\n* **Reformatted the entire document:** Improved the overall structure and layout for easier reading and a more professional appearance.\n\n\n**Additional Tips:**\n\n* **Tailor your resume for each job application.** Highlight the skills and experiences that are most relevant to the specific role.\n* **Use strong action verbs:** This will make your resume more engaging and impactful.\n* **Quantify your accomplishments:** Whenever possible, use numbers to demonstrate the impact of your work.\n* **Proofread carefully:** Ensure your resume is free of errors before submitting it.\n* **Consider using a resume builder:** There are many online resume builders that can help you create a professional-looking resume.",
    #   ],
    # },
    # {
    #   "role": "user",
    #   "parts": [
    #     "should i add html and css in my skills?\n",
    #   ],
    # },
    # {
    #   "role": "model",
    #   "parts": [
    #     "It's a good idea to include HTML and CSS in your skills section, but it depends on the specific role you're applying for. Here's why:\n\n**Reasons to Include:**\n\n* **Foundation of Web Development:** HTML and CSS are fundamental to web development. Including them demonstrates your basic understanding of web technologies, even if you focus more on JavaScript frameworks like React. \n* **Common Expectations:** Many employers expect a basic understanding of HTML and CSS, even for roles that heavily emphasize front-end frameworks.\n* **Complementary Skills:** Your proficiency in React, Next.js, and React Native implies you likely have a solid grasp of HTML and CSS. \n\n**When You Might Not Include:**\n\n* **If the job description doesn't explicitly mention them:** If the role heavily focuses on backend development, advanced JavaScript frameworks, or specific technologies that don't rely heavily on HTML and CSS, it might be okay to omit them. \n\n**Alternative Options:**\n\n* **Briefly mention it in your Summary:** You can say something like \"Proficient in HTML, CSS, and JavaScript frameworks.\" This allows you to showcase your knowledge without taking up valuable space in your skills section.\n\n**Ultimately, the decision to include HTML and CSS depends on the specific role you're applying for.  Consider the job description, your level of expertise, and the overall focus of your resume.**\n\nFor example, if you are applying for a React Developer position, it's good practice to include them as it demonstrates that you understand the basics of web development. However, if you are applying for a Backend Developer role with a minimal focus on front-end development, it might be less relevant to include them. \n",
    #   ],
    # },
  ]
)

def gemini_upload(file):
  # TODO Make these files available on the local file system
  # You may need to update the file paths
  files = [
    upload_to_gemini(file, mime_type="application/pdf"),
  ]

  # Some files have a processing delay. Wait for them to be ready.
  wait_for_files_active(files)


def gemini_chat(message):
  response = chat_session.send_message(message)
  return response.text


def gemini_chat_stream(message):
  response = chat_session.send_message(message, stream=True)
  
  for chunk in response:
    data = json.dumps({
      "data": chunk.text
    })
    yield data