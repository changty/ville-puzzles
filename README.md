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
    # or
    npm run build

The build artifacts can be found in the `/dist` folder

### Notes

This project is using [Parcel](https://parceljs.org/) for bundling and transpiling the source code with the help of [babel](https://babeljs.io/). The documentation for Parcel can be found [here](https://parceljs.org/getting_started.html).

CSS files can be imported directly in the Javascript. All CSS will be automatically prefixed for the supported browsers and separated from the Javascript code.

List of supported browsers can be found in the `package.json` file under the `browserslist` key. The project uses [browserslist](https://github.com/ai/browserslist) to parse the supported browsers from that key.

The source code will be transpiled to be compatible with the listed browsers.

**Important**:
Puzzle 3 contains atleast two XSS vulnerability:

* `setting.backgroundUrl` is used as a source URL for the background image and can point to anywhere
* `setting.draggables[].content` is used as a source URL and can point to anywhere

## Embedding a Puzzle

1.  Build the project or use a previous build from `/dist` folder
2.  Copy the files for the puzzle you are about to embed. For example:

    * `Puzzle1.<hash>.js`
    * `Puzzle1.<hash>.map`
    * `Puzzle1.<hash>.css`
    * `Puzzle1.html` (this is not needed if you create a corresponding one yourself, check the source code at `./src/Puzzle1.html`)

    Note: for Puzzle3 you also need the `*.gif` and `*.svg` files.

3.  Either use the included `.html` (`Puzzle1.html` for exampe) file or create one more suited to the environment you are embedding the puzzle.
4.  Check **Settings** section for more info about the setup of a puzzle.

## Settings

Each Puzzle takes in a JavaScript object or a JSON formatted string as a parameter. An example is given in each puzzle specific `.html` file.

The settings object is separated into 2 parts:

* **"setting"** is for the setup of the puzzle
* **"locale"** is for the localized strings used in the puzzle. Locale is again separated into 2 parts:
  * **"specific"** strings specific to this puzzle
  * **"general"** strings that are same for each puzzle

**"setting"** these are quite self explanatory for each puzzle. You can check the examples from `./src/<puzzlename>.html`. Some notes:

* Puzzle1 `setting.key` can be a string representing any positive or negative integer ( "-3", "-2", "-1", "+1", "+2", "+3"). You need to include the sign (- or +).
* Puzzle2 `setting.input` can be `text-only`, `mouse-only` or `text-or-mouse`.
