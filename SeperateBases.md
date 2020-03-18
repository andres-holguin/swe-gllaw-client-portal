## Getting Started

All steps below are required before the project can be run

### Environment Variables

Configuration Variables are stored in a .env file in the project root.

* MongoDB database URI: DB_URI

* JSOW Web Token Verification: JWT_SECRET

* Server listening port: PORT - Please use 3001

  Example:

  ```
  DB_URI=mongodb://127.0.0.1:27017
  JWT_SECRET=randomsecret
  PORT=3001
  ```


## Available Scripts

In the project directory, you can run:

### `npm run start`

Run the app in production mode. <br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Uses the build from react files and the server so no live changes are available.

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode as well as builds the server/

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run install-all`

Installs all dependencies for client and server
