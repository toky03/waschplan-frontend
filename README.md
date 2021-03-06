This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the dependencies in the local node_modules folder

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The Waschplan Frontend connects to following url unless not changed in constants.ts:
API_URL = 'https://waschplan.bubelu.ch/api/'
WS_URL = 'wss://waschplan.bubelu.ch/api/subscribe/'

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

# Build Docker Image

Build the Frontend Docker Image in a multi stage docker build as described in the Dockerfile
### `npm run build-docker`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
