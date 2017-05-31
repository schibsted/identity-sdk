[![Build Status](https://travis-ci.org/schibsted/identity-sdk-node.svg?branch=master)](https://travis-ci.org/schibsted/identity-sdk-node)
[![GitHub issues](https://img.shields.io/github/issues/schibsted/identity-sdk-node.svg)](https://github.com/schibsted/identity-sdk-node/issues)
[![Version](https://img.shields.io/npm/v/schibsted-identity-sdk-node.svg?style=flat-square)](http://npm.im/schibsted-identity-sdk-node)
[![Downloads](https://img.shields.io/npm/dm/schibsted-identity-sdk-node.svg?style=flat-square)](http://npm-stat.com/charts.html?package=schibsted-identity-sdk-node&from=2017-01-01)
[![MIT License](https://img.shields.io/npm/l/schibsted-identity-sdk-node.svg?style=flat-square)](http://opensource.org/licenses/MIT)

# Introduction

![Schibsted Common Components Logo](cc-logo.png)

This SDK simplifies working with the identity endpoints of Schibsted.
The files in this package are wrappers for many API endpoints as documented on the
[Tech Docs](http://techdocs.spid.no/).
They are grouped more or less according to the structure in the Tech Docs and all of them return a
Promise that will be solved or rejected based on the fate of the call.

# How to use it

Most SPiD APIs need some sort of authentication. There are 3 classes for that. The reason for using
classes is because they keep the state and only work on those states. the rest of the SDK follows FP
patterns.

* `OpenApi`: allows calling endpoints that don't need any authenticaion (just a few APIs)
* `UserApi`: allows calling endpoints that require Access Token (and Refresh Token). It automatically
refreshes the Access Token when needed. (quite a few endpoints use this authorization mechanism)
* `ServerApi`: allows calling APIs that are mostly used for server-to-server communication between
client (like Aftonbladet) and SPiD (for identification and payment).

```javascript
const { OpenApi, UserApi, ServerApi } = require('path/to/identity-web-sdk-node');
```

All these `XXXXApi` classes above provide `post()`, `get()` and `delete()` function that abstracts the
relevant HTTP verb. See documentation for more info.

```javascript
const fetch = require('node-fetch');
const spid = new UserApi(fetch, 'http://spp.dev', accessToken, refreshToken);
spid.post('path/to/endpoint', objectContainingParamsAndTheirValues);
```

This returns a promise.

Many endpoints are already wrapped in node functions (see the `lib/api` directory and also the
documentation).

For example:

```javascript
// Instead of
spid.post(`/user/${userId}/agreements/accept`, {userId});
// You can write
const sdk = require('identity-web-sdk-node');
sdk.agreement.accept(spid, api, userId);
```

# Documentation

You can see [the HTML documentation](https://pages.github.schibsted.io/spt-identity/identity-web-sdk-node/)
in the `/doc` folder (generate it using `npm run docs`).
