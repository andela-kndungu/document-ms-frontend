[![Build Status](https://travis-ci.org/andela-kndungu/document-ms-frontend.svg?branch=master)](https://travis-ci.org/andela-kndungu/document-ms-frontend)
[![Coverage Status](https://coveralls.io/repos/github/andela-kndungu/document-ms-frontend/badge.svg?branch=master)](https://coveralls.io/github/andela-kndungu/document-ms-frontend?branch=master)

# Document Management System

Andela's Javascript curriculum fourth checkpoint.


##Prerequisites

####Installing `git`
Follow the instructions at [https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install `git` which is required to clone the repository.

####Installing `node`
1. Visit [https://nodejs.org/](https://nodejs.org/) and follow the instructions provided to install `node`.
2. Follow the instructions at [https://docs.npmjs.com/getting-started/fixing-npm-permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions) to be able to install `npm` packages globally without providing the root password.

#### Installing Mongo
Visit [https://www.mongodb.com/download-center?jmp=nav#community](https://www.mongodb.com/download-center?jmp=nav#community) and follow the instructions provided to install mongodb.

## Downloading the project and installing dependencies
From a terminal run the following commands:

```bash
cd

git clone https://github.com/andela-kndungu/document-ms-frontend.git

cd document-ms-frontend

npm install
```

## Defining environment variables
From a terminal do the following

```bash
cd ~/document-ms

vim .env

# Press i to enter insert mode

# Paste the following
PORT=3000
MONGODB_URI='mongodb://localhost/document-ms'
MONGODB_URI_TEST='mongodb://localhost/document-ms-test'
SECRET_KEY='thisIsMySecret' # Can be any string
GOOGLE_CLIENT_ID="yourId.apps.googleusercontent.com" # Any random string will do to run the tests
GOOGLE_CLIENT_SECRET="I am a string" # Any random string will do to run the tests
GOOGLE_CALLBACK_URL="http://127.0.0.1:3000/api/users/login/auth/google/callback"
GITHUB_CLIENT_ID="I am a string" # Any random string will do to run the tests
GITHUB_CLIENT_SECRET="I am a string" # Any random string will do to run the tests
GITHUB_CALLBACK_URL="http://127.0.0.1:3000/api/users/login/auth/github/callback"


# Press the escape key to get out of insert mode
# Type ':wq' and then press enter to save and exit

```

## Running the tests
From a terminal run the following commands:

```bash

cd ~/document-ms-frontend # Just to be sure

npm test
```
