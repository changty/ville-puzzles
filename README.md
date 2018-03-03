# Ville Puzzles

## Development

### Prerequisites

* [nodejs](https://nodejs.org/en/download/)
* npm or [yarn](https://yarnpkg.com/en/docs/install)

### Install development dependencies

    yarn install
    # or
    npm install

### Run the development server with active watch

    yarn start
    # or
    npm start

### Run unit tests

    yarn test
    # or
    npm test

### Build the project

    yarn build
    # ord
    npm run build

The build artifacts can be found in the `/dist` folder

### Notes

This project is using [Parcel](https://parceljs.org/) for bundling and transpiling the source code with the help of [babel](https://babeljs.io/). The documentation for Parcel can be found [here](https://parceljs.org/getting_started.html).

CSS files can be imported directly in the Javascript. All CSS will be automatically prefixed for the supported browsers and separated from the Javascript code.

List of supported browsers can be found in the `package.json` file under the `browserslist` key. The project uses [browserslist](https://github.com/ai/browserslist) to parse the supported browsers from that key.

The source code will be transpiled to be compatible with the listed browsers.
