# @snaptrade/js-fetch-api

A SnapTrade NodeJS sdk to help you make requests to the [SnapTrade API][1] endpoints more easily.

Contact us to schedule a demo and get a consumer key: [api@snaptrade.com][contact].

---

## Requirements

- Node 17 or later

## Installation

```
npm i @snaptrade/js-fetch-api
```

## Getting Started

- Before getting started, you will need a **clientID** and a **consumerKey**. If you don't have one, please send us an [email][contact]
  to get a new one.

**Note** : Your consumerKey should always remain a secret! Never hard code it!

```typescript
const SnapTrade = require("@snaptrade/js-fetch-api");

const const snapTrade = new SnapTrade(
  "CLIENT_ID",
  "CONSUMER_KEY"
);

// Register a new user
const registerUser = async () => {
  const registeredUser = await snapTrade.registerUser(
    "USER_ID"
  );
  return registeredUser;
};
```

---

## Authentication

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

Check out the documentation below for making requests to other SnapTrade API endpoints using this sdk:

- [Account Information Endpoints]
- [Trading Endpoints]
- [Connections Endpoints]
- [Reference Data Endpoints]
- [Transaction and Reporting Endpoints]

---

## License & copyrights

Licensed under [Apache License 2.0][2].

[1]: https://docs.snaptrade.com/reference/getting-started
[contact]: mailto:api@snaptrade.com
[2]: LICENSE
[account information endpoints]: docs/account-information-endpoints.md
[trading endpoints]: docs/trading-endpoints.md
[connections endpoints]: docs/connections-endpoints.md
[reference data endpoints]: docs/reference-data-endpoints.md
[transaction and reporting endpoints]: docs/transaction-and-reporting-endpoints.md
