import numpy as np
import pandas as pd
import nltk
nltk.download('punkt')
nltk.download('snowball_data')
nltk.download('perluniprops')
nltk.download('universal_tagset')
nltk.download('stopwords')
nltk.download('nonbreaking_prefixes')
nltk.download('wordnet')
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from string import punctuation
from pymystem3 import Mystem
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD


def groups_from_response(response: dict) -> pd.DataFrame:
  """
  Converts reponse from VK API (fetchtools.get_many_group_data) to pandas DataFrame."""
  grobjects = []
  for group in response['response']['groups']:
    try:
      grobjects.append({
        'name': group['name'],
        'description': group['description'],
        'activity': group['activity'],
        'status': group['status'],
      })
    except Exception as e:
      print(group)
      print(e)
  return pd.DataFrame(grobjects)


def rm_punct(arr: np.array):
  return np.array([word for word in arr if word not in punctuation])


rusw = stopwords.words('russian')
ensw = stopwords.words('english')
def rm_sw(arr: np.array):
  return np.array([word for word in arr if word not in rusw and word not in ensw])


mystem = Mystem()
def lemmatize(arr: np.array):
  return np.array([mystem.lemmatize(word)[0] for word in arr])


def preprocess(groups: pd.DataFrame) -> list[str]:
  """
  Turns raw group data into preprocessed sdv matrix
  """
  X = groups
  for column in X.columns:
    X.loc[:, column] = X[column].apply(lambda x: x.lower())
  
  for column in X.columns:
    X.loc[:, column] = X[column].apply(word_tokenize)
  
  for column in X.columns:
    X.loc[:, column] = X[column].apply(rm_punct)

  for column in X.columns:
    X.loc[:, column] = X[column].apply(rm_sw)
  
  # real slow...
  for column in X.columns:
    X.loc[:, column] = X[column].apply(lemmatize)
  
  corpus = []
  for row in X.index:
    document = ''
    for column in X.columns:
      document += ' ' + ' '.join(X.loc[row, column])
    corpus.append(document)
  corpus = pd.Series(corpus)

  vectorizer = TfidfVectorizer()
  X = vectorizer.fit_transform(corpus)

  svd = TruncatedSVD(n_components=3)
  res = svd.fit_transform(X)

  return res
