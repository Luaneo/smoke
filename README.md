# Smoke

## О проекте

Smoke - это мини-приложение в ВК для подростков, помогающее бросить курить. Приложение содержит рекомендательную систему, на основе которой пользователю предлагаются товары-альтернативы по его интересам.

## Text preprocessing

We use groups the user's subscribed to. Currently we're randomly selecting 5 groups and decide on the alternative product based on the most common prediction.

1. lowercasing
2. word_tokenization
3. removing punctuation
4. removing stop words
5. lemmatization
6. TF-IDF vectorization
7. Truncated SVD (to reduce dimentionality)

notebook: [preprocessing.ipynb](./preprocessing/preprocessing.ipynb)

.py module: [preprocessing.py](./preprocessing/preprocessing.py)

Visualization of text after preprocessing:

![image failed to load...](images/selected3d.png)

<!-- ## ML model

We decided to use the KNN model. -->
