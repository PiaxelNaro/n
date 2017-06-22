# Napoleon

# Get started

## Server


You need install docker at first, then

```
npm install yarn -g
yarn install
bin/dev.js --proxy www

# define a api proxy directly
bin/dev.js --proxy www
```

## Demo / Documentation


```
yarn install
yarn run storybook
```

Files named `stories.js` will automatically be required.

On pre-commit, we'll automatically format the code using Prettier. We recommend [setting it up in your favorite editor](https://github.com/prettier/prettier#editor-integration).

# Tests

```
yarn test

# OR
jest --watch --coverage
```

`yarn test` will run:

1. Eslint validation
2. Flow types checking
3. Jest unit tests
4. Coverage reports (currently enforced to minimum threshold of 100%)

Install watchman if jest could not start with this error:

> (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)

```
brew install watchman
```

# Manage Dependencies

```
# Update/install dependencies
yarn install

# Add dev tooling
yarn add --dev jest

# Add production dependency
yarn add react-modal
```

# Flow type

We use flowtype to type check our code. To setup the dependencies properly, you need to:

```
# 1. Install flow-typed
yarn global add flow-typed

# 2. Install local type definitions
flow-typed install
```

# Performance

### Webpack bundle analyzer

You can analyze the size of the client bundle with:

```js
yarn run build
yarn run analyze-bundle
```

Note: Make sure you build the production bundle before analyzing otherwise you'll see wrong data.
