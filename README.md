# Simple Blog using React, Redux and Fethersjs

---

## About

> This project using a starter [boilerplate](https://github.com/bertho-zero/react-redux-universal-hot-example)

## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run dev
```

## Building and Running Production Server

```bash
npm run build
npm run start
```

## Demo

A demonstration of this app can be seen [running on heroku](https://simple-blog-react-redux.herokuapp.com/), which is a deployment of the [deploy branch](https://github.com/cyberid41/simple-blog-react/tree/deploy).

## Documentation

* [Exploring the Demo App](docs/ExploringTheDemoApp/ExploringTheDemoApp.md) is a guide that can be used before you install the kit.
* [Installing the Kit](docs/InstallingTheKit/InstallingTheKit.md) guides you through installation and running the development server locally.
* [Adding Text to the Home Page](docs/AddingToHomePage/AddingToHomePage.md) guides you through adding "Hello, World!" to the home page.
* [Adding A Page](docs/AddingAPage/AddingAPage.md) guides you through adding a new page.
* [React Tutorial - Converting Reflux to Redux](http://engineering.wework.com/process/2015/10/01/react-reflux-to-redux/), by Matt Star
   If you are the kind of person that learns best by following along a tutorial, I can recommend Matt Star's overview and examples.

#### API Server

This is where the meat of your server-side application goes. It doesn't have to be implemented in Node or Express at all. This is where you connect to your database and provide authentication and session management. In this example, it's just spitting out some json with the current time stamp.

#### Getting data and actions into components

To understand how the data and action bindings get into the components – there's only one, `InfoBar`, in this example – I'm going to refer to you to the [Redux](https://github.com/gaearon/redux) library. The only innovation I've made is to package the component and its wrapper in the same js file. This is to encapsulate the fact that the component is bound to the `redux` actions and state. The component using `InfoBar` needn't know or care if `InfoBar` uses the `redux` data or not.

#### Images

Now it's possible to render the image both on client and server. Please refer to issue [#39](https://github.com/erikras/react-redux-universal-hot-example/issues/39) for more detail discussion, the usage would be like below (super easy):

```javascript
let logoImage = require('./logo.png');
```

#### Styles

This project uses [local styles](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284) using [css-loader](https://github.com/webpack/css-loader). The way it works is that you import your stylesheet at the top of the `render()` function in your React Component, and then you use the classnames returned from that import. Like so:

```javascript
render() {
const styles = require('./App.scss');
...
```

Then you set the `className` of your element to match one of the CSS classes in your SCSS file, and you're good to go!

```jsx
<div className={styles.mySection}> ... </div>
```

#### Alternative to Local Styles

If you'd like to use plain inline styles this is possible with a few modifications to your webpack configuration.

**1. Configure Isomorphic Tools to Accept CSS**

In `webpack-isomorphic-tools.js` add **css** to the list of style module extensions

```javascript
    style_modules: {
      extensions: ['less','scss','css'],
```

**2. Add a CSS loader to webpack dev config**

In `dev.config.js` modify **module loaders** to include a test and loader for css

```javascript
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader'},
```

**3. Add a CSS loader to the webpack prod config**

You must use the **ExtractTextPlugin** in this loader. In `prod.config.js` modify **module loaders** to include a test and loader for css

```javascript
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
```

**Now you may simply omit assigning the `required` stylesheet to a variable and keep it at the top of your `render()` function.**

```javascript
render() {
require('./App.css');
require('aModule/dist/style.css');
...
```

**NOTE** In order to use this method with **scss or less** files one more modification must be made. In both `dev.config.js` and `prod.config.js` in the loaders for less and scss files remove 

1. `modules`
2. `localIdentName...`

Before:
```javascript
{ test: /\.less$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap' },
```
After:
```javascript
{ test: /\.less$/, loader: 'style!css?importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap' },
```

After this modification to both loaders you will be able to use scss and less files in the same way as css files.

#### Unit Tests

The project uses [Mocha](https://mochajs.org/) to run your unit tests, it uses [Karma](http://karma-runner.github.io/0.13/index.html) as the test runner, it enables the feature that you are able to render your tests to the browser (e.g: Firefox, Chrome etc.), which means you are able to use the [Test Utilities](http://facebook.github.io/react/docs/test-utils.html) from Facebook api like `renderIntoDocument()`.

To run the tests in the project, just simply run `npm test` if you have `Chrome` installed, it will be automatically launched as a test service for you.

To keep watching your test suites that you are working on, just set `singleRun: false` in the `karma.conf.js` file. Please be sure set it to `true` if you are running `npm test` on a continuous integration server (travis-ci, etc).

## Deployment on Heroku

To get this project to work on Heroku, you need to:

1. Remove the `"PORT": 8080` line from the `betterScripts` / `start-prod` section of `package.json`.
2. `heroku config:set NODE_ENV=production`
3. `heroku config:set NODE_PATH=./src`
4. `heroku config:set NPM_CONFIG_PRODUCTION=false`
  * This is to enable webpack to run the build on deploy.

The first deploy might take a while, but after that your `node_modules` dir should be cached.

## FAQ

This project moves fast and has an active community, so if you have a question that is not answered below please visit our [Discord channel](https://discord.gg/0ZcbPKXt5bZZb1Ko) or file an issue.


## Roadmap 

Although this isn't a library, we recently started versioning to make it easier to track breaking changes and emerging best practices. 

* [Inline Styles](docs/InlineStyles.md) - CSS is dead

## Contributing

I am more than happy to accept external contributions to the project in the form of feedback, bug reports and even better - pull requests :) 

If you would like to submit a pull request, please make an effort to follow the guide in [CONTRIBUTING.md](CONTRIBUTING.md). 
 
---
Thanks for checking this out.

– Erik Rasmussen, [@erikras](https://twitter.com/erikras)
