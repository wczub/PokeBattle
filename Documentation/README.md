# Setting up your environment

## Pip

```$ sudo pip install -r requirements.txt```

## Upgrade Node version to 6

```$ nvm install 6```

## Installing Webpack

```$ npm install -g webpack```

## Installing `npm` dependencies from `package.json`

```$ npm install```

## Compiling Javascript using Webpack

```$ webpack --watch```

(The program should not stop running. Leave it running.)


**Do not manually edit `static/script.js`!!**

## Add new JS files

Stuff that is added to `scripts/` and referenced somewhere else will 
automatically be packaged into `static/script.js`.

## Running the web server

Click on the green button on `app.py`, or open up a new terminal and type:

```$ python app.py```
