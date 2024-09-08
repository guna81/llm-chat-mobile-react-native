
from langchain.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.chat_models import ChatOllama
from langchain_core.runnables import RunnablePassthrough
from langchain.retrievers.multi_query import MultiQueryRetriever

from llm_rag.vector_db import load_vector_db

# LLM from Ollama
local_model = "llama3:latest"
llm = ChatOllama(model=local_model)


QUERY_PROMPT = PromptTemplate(
    input_variables=["question"],
    template="""You are an AI language model assistant. Your task is to generate five
    different versions of the given user question to retrieve relevant documents from
    a vector database. By generating multiple perspectives on the user question, your
    goal is to help the user overcome some of the limitations of the distance-based
    similarity search. Provide these alternative questions separated by newlines.
    Original question: {question}""",
)


def inference(question):
  vector_db = load_vector_db()
  # RAG retriever
  retriever = MultiQueryRetriever.from_llm(
      vector_db.as_retriever(), 
      llm,
      prompt=QUERY_PROMPT
  )

  # RAG prompt
  template = """Answer the question based ONLY on the following context:
  {context}
  Question: {question}
  """
  print('template', template)
  prompt = ChatPromptTemplate.from_template(template)

  chain = (
      {"context": retriever, "question": RunnablePassthrough()}
      | prompt
      | llm
      | StrOutputParser()
  )

  answer = chain.invoke(question)

  return answer
