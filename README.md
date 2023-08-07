# Introduction

For this project i have been inspired to make Administrating dashboard for managing car service records,clients and service history. This dashboard allows to add new clients,update their repair stauts, allows you to see repairs history with repaired details.

# Getting Started

### 1. Installation process

#### Frontend

Install SASS for styling , more information you can find [here](https://sass-lang.com/install/)
Install React Router Dom for routing, more information you can find [here](https://reactrouter.com/en/main/start/tutorial)
Install Material UI . more information you can find [here](https://mui.com/material-ui/getting-started/installation/)

#### Backend

Make sure you are using Node.js, to check you can press ctrl+` and open terminal and type node-v, this will allow you to see latest version of NOde.js and if you have Node.js installet into your project to download press [here](https://nodejs.org/en)

If you will be using MongoDB, make sure you have it installed, if not type in terminal npm install mongodb more you can find [here](https://www.mongodb.com/docs/drivers/node/v4.1/quick-start/)

Install mongoose for mongoDB, type in terminal npm install mongoose --save more you can find [here](https://mongoosejs.com/docs/index.html)

You can use also Nodemon that allows you on every save refresh the server so you dont need to do it manualy. to Use it type in terminale npm install nodemon --save-dev and in package.json file make these changes

scripts: {

"start": "node app.js",

"dev": "nodemon app.js

}

and use it by typing in ternimal npm run dev

### 2. Software dependencies

#### For your project you need to have these dependencies :

Node.js: mongodb, mongoose, express , mongoose,cors, dotenv. , Nodemon

React.js : React Router , SASS , Material UI

# Build

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
