<br>

<div align="center">
  <img src="https://bookface-images.s3.amazonaws.com/logos/90412fbc5679b873ae4756218a6fb86d0f4c99c2.png" alt="snaptrade">
</div>
<h1 align="center">@snaptrade/js-fetch-api</h1>
<h3 align="center">A SnapTrade NodeJS sdk to help you make requests to the <a href="https://docs.snaptrade.com/reference/getting-started">SnapTrade API</a> endpoints more easily.</h3>
<br>
<p>Contact us to schedule a demo and get a consumer key: <a href="mailto:api@snaptrade.com">api@snaptrade.com</a></p>
<br>

## [![NPM Version](https://img.shields.io/npm/v/@snaptrade/js-fetch-api.svg?style=flat-square)](https://www.npmjs.com/package/@snaptrade/js-fetch-api)

## [![NPM Downloads](https://img.shields.io/npm/dm/@snaptrade/js-fetch-api.svg?style=flat-square)](https://www.npmjs.com/package/@snaptrade/js-fetch-api)

## 📖 Table of Contents

- [⚙️ Requirements](#⚙️-requirements)
- [🚀 Getting Started](#🚀-getting-started)
- [🕵🏼‍♂️ Authentication](#🕵🏼‍♂️-authentication)
  - [Register user](#register-user)
  - [Login user](#login-user)
  - [Delete user](#delete-user)
- [📑 Full Documentation](#📑-full-documentation)
- [👨🏼‍⚖️ License & Copyrights](#👨🏼‍⚖️-license--copyrights)

---

## ⚙️ Requirements

- Node 17 or later
- You need to have a **clientID** and a **consumerKey**. If you don't have one, please send us an [email][contact].

---

## 🚀 Getting Started

```shell
npm i @snaptrade/js-fetch-api
```

**Note** : Your consumerKey should always remain a secret! Never hard code it!

```typescript
const SnapTrade = require("@snaptrade/js-fetch-api");

const const snapTrade = new SnapTrade(
  "CLIENT_ID",
  "CONSUMER_KEY"
);
```

---

## 🕵🏼‍♂️ Authentication

### _register user_

Register user with SnapTrade in order to create secure brokerage authorizations.

##### Signature:

```typescript
 registerUser(data: {
    userId: string;
    rsaPublicKey?: string;
  }): Promise<RegisterUserResponseType>
```

##### Example:

```typescript
const registerUser = async () => {
  const registeredUser = await snapTrade.registerUser({
    userId: 'USER_ID',
    rsaPublicKey: 'ssh-rsa RSA_PUBLIC_KEY', //only required if RSA is enabled for the partner
  });
  return registeredUser;
};
```

### _login user_

Generate a redirect URI to securely login a user to the SnapTrade Connection Portal.

##### Signature:

```typescript
generateRedirectURI({
    userId,
    userSecret,
  }: DefaultQueryParams, data: {broker: string; immediateRedirect: boolean; customRedirect: string}): Promise<RedirectURIResponseType>
```

##### Example:

```typescript
const redirectURI = async () => {
  const uri = await snapTrade.generateRedirectURI({
    userId: 'USER_ID',
    userSecret: 'USER_SECRET',
  }, {
    broker: 'ALPACA',
    immediateRedirect: true,
    customRedirect: 'https://passiv.com"
  });
  return uri;
};
```

### _delete user_

Delete user from SnapTrade, disabling all brokerage authorizations and permanently deleting all data associated with the user.

##### Signature:

```typescript
deleteUser({
    userId,
    userSecret,
  }: DefaultQueryParams): Promise<DeleteUserResponseType>
```

##### Example:

```typescript
const deleteUser = async () => {
  const deletedUser = await snapTrade.deleteUser({
    userId: 'USER_ID',
    userSecret: 'USER_SECRET',
  });
  return deletedUser;
};
```

---

## 📑 Full Documentation

Documentations for making requests to other SnapTrade API endpoints using this sdk:

- [Helper Functions]
- [Account Information Endpoints]
- [Trading Endpoints]
- [Connections Endpoints]
- [Reference Data Endpoints]
- [Transaction and Reporting Endpoints]

---

## 👨🏼‍⚖️ License & copyrights

Licensed under [Apache License 2.0][2].

[contact]: mailto:api@snaptrade.com
[2]: LICENSE
[helper functions]: docs/helper-functions.md
[account information endpoints]: docs/account-information-endpoints.md
[trading endpoints]: docs/trading-endpoints.md
[connections endpoints]: docs/connections-endpoints.md
[reference data endpoints]: docs/reference-data-endpoints.md
[transaction and reporting endpoints]: docs/transaction-and-reporting-endpoints.md
