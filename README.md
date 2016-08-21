[![Build Status](https://travis-ci.org/andela-kndungu/document-ms-frontend.svg?branch=master)](https://travis-ci.org/andela-kndungu/document-ms-frontend)
[![Coverage Status](https://coveralls.io/repos/github/andela-kndungu/document-ms-frontend/badge.svg?branch=master)](https://coveralls.io/github/andela-kndungu/document-ms-frontend?branch=master)

# Document Management System

![Quiz app icon](https://cloud.githubusercontent.com/assets/17295379/15103681/de0b7cb8-15b6-11e6-8d3e-1ae4500763c9.png)

Andela's Javascript curriculum third checkpoint.

## Accessing the API the easy way
Navigate to [http://ennovate.xyz](http://ennovate.xyz) on your browser

## Accessing the API the hard way

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

git clone https://github.com/andela-kndungu/document-ms.git

cd document-ms

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
DATABASE_URI='mongodb://localhost/document-ms'
SECRET_KEY='thisIsMySecret' # Can be any string

# Press the escape key to get out of insert mode
# Type ':wq' and then press enter to save and exit

```

## Starting the server

From a terminal run the following command:
```bash
sudo mongod # Provide your password when prompted then press enter
```
On a different terminal run the following commands

```bash
cd ~/document-ms

node app.js
```
Now navigate to [http://localhost:3000/](http://localhost:3000/) on your browser

## Running the tests
From a terminal run the following commands:

```bash
# Press CTRL + C on your keyboard to stop node if it is running

cd ~/document-ms # Just to be sure

npm test
```

## API ENDPOINTS

```json
{
    "/": {
        "verbs": {
            "GET": {
                "purpose": "Check whether the server is running",
                "token required": false
            }
        }
    },
    "/users/login": {
        "verbs": {
            "POST": {
                "purpose": "Logs in a user",
                "token required": false,
                "request body": {
                    "username": "Your user name",
                    "password": "Your password"
                }
            }
        }
    },
    "/users/": {
        "verbs": {
            "POST": {
                "purpose": "Create a new user",
                "token required": false,
                "request body": {
                    "username": "New user's user name",
                    "name": {
                        "first": "New user's first name",
                        "last": "New user's last name"
                    },
                    "email": "New user's email addresss",
                    "password": "New user's password",
                }
            },
            "GET": {
                "purpose": "Get all registered users",
                "token required": true,
                "request header": {
                    "x-access-token": "Token received after logging in",
                }
            }
        }
    },
    "/users/<id>": {
        "verbs": {
            "GET": {
                "purpose": "Get user by id",
                "token required": true,
                "request header": {
                    "x-access-token": "Token received after logging in",
                }
            },
            "PUT": {
                "purpose": "Update user specified by id",
                "token required": true,
                "request body": {
                    "username": "New username (optional)",
                    "name": {
                        "first": "New first name (otional)",
                        "last": "New last name (optional)"
                    },
                    "email": "New email address (optional)",
                    "password": "New passwod (optional)",
                    "roles": "Array of new roles (optional)"
                },
                "request header": {
                    "x-access-token": "Token received after logging in",
                }
            },
            "DELETE": {
                "purpose": "Delete user by id",
                "token required": true,
                "request header": {
                    "x-access-token": "Token received after logging in",
                }
            }
        }
    },
    "/documents/": {
        "verbs": {
            "GET": {
                "purpose": "Get all documents which you have access to",
                "token required": true,
                "request header": {
                    "x-access-token": "Token received after logging in",
                }
            },
            "POST": {
                "purpose": "Create a new document",
                "token required": true,
                "request body": {
                    "title": "New document's title",
                    "content": "New document's content",
                    "accessibleBy": "Array of roles which can access document",
                    "tags": "Array of document's tags"
                },
                "request header": {
                    "x-access-token": "Token received after logging in",
                }
            }
        }
    },
    "/documents?query string": {
        "verbs": {
            "GET": {
                "purpose": "Get all matching documents",
                "token required": true,
                "request header": {
                    "x-access-token": "Token received after logging in",
                }
            }
        },
        "parameters": {
            "date": {
                "value": "Date string in ISO format",
                "purpose": "Return documents created on a specific date"
            },
            "tag": {
                "value": "Name of a tag as a string",
                "purpose": "Return documents with specified tag"
            },
            "role": {
                "value": "Name of a role as a string",
                "purpose": "Return documents accessible by specified role"
            },
            "limit": {
                "value": "An integer",
                "purpose": "Return only specified number of documents"
            },
            "page": {
                "value": "An integer",
                "purpose": "Return documents from specified page (works with limit)"
            }
        }
    },
    "/documents/<id>": {
        "verbs": {
            "GET": {
                "purpose": "Get document by id",
                "token required": true,
                "request header": {
                    "x-access-token": "Token received after logging in",
                }
            },
            "PUT": {
                "purpose": "Update document specified by id",
                "token required": true,
                "request body": {
                    "title": "New title (optional)",
                    "content": "New content (optional)",
                    "accessibleBy": "New array of access roles (optional)",
                    "tags": "New array of tags (optional)"
                },
                "request header": {
                    "x-access-token": "Token received after logging in",
                }
            },
            "DELETE": {
                "purpose": "Delete document by id",
                "token required": true,
                "request header": {
                    "x-access-token": "Token received after logging in",
                }
            }
        }
    },
    "/users/<id>/documents": {
        "verbs": {
            "GET": {
                "purpose": "Get all documents belonging to specified user id",
                "token required": true,
                "request header": {
                    "x-access-token": "Token received after logging in",
                }
            }
        }
    }
}
```
