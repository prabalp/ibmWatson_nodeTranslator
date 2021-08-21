
# Language Translator

A language translator made using IBM-WATSON language translator api

Demo: https://translator-node-deploy.herokuapp.com/
## Setting up the API key

Go to the IBM watson website and sign up for the translator api. After selecting the translator service you need to download the api key.

  
## Installation

Clone this repo 

```bash
    git clone https://github.com/prabalp/ibmWatson_nodeTranslator.git
    cd ibmWatson_nodeTranslator
```
Install all npm packages

```bash
    npm i
```

Create a .env file in the root directory and setup the enviromental variables

```bash
    LANGUAGE_TRANSLATOR_URL=<url from ibm account>
    LANGUAGE_TRANSLATOR_IAM_APIKEY=<key from ibm account>
```