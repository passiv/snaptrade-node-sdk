## Connections endpoints

### _authorizations_

List all brokerage authorizations for the user

##### Signature:

```typescript
fetchBrokerageAuthorizations({
    userId,
    userSecret,
  }: DefaultQueryParams,  options?: RequestOptionsType): Promise<BrokerageAuthResponseType[]>
```

##### Example:

```typescript
const authorizations = async () => {
  const authorizedBrokerages = await snapTrade.fetchBrokerageAuthorizations(
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    { timeout: 65000 } // default timeout is 60000
  );
  return authorizedBrokerages;
};
```

### _authorized brokerage_

Get detail of a specific brokerage authorizations for the user

##### Signature:

```typescript
fetchAuthorization(
    { userId, userSecret }: DefaultQueryParams,
    authorizationId: string,  options?: RequestOptionsType
  ): Promise<BrokerageAuthResponseType>
```

##### Example:

```typescript
const brokerage = async () => {
  const authorizedBrokerage = await snapTrade.fetchAuthorization(
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    'AUTHORIZATION_ID',
    { timeout: 65000 }
  );
  return authorizedBrokerage;
};
```

### _remove authorization_

Remove a brokerage authorization.

##### Signature:

```typescript
deleteAuthorization(
  { userId, userSecret }: DefaultQueryParams,
  authorizationId: string, options?: RequestOptionsType
): Promise<BrokerageAuthResponseType>
```

##### Example:

```typescript
const delete= async () => {
  const deletedAuthorization = await snapTrade.deleteAuthorization(
    {
      userId: "USER_ID",
      userSecret: "USER_SECRET",
    },
    "AUTHORIZATION_ID",
    { timeout: 65000 }
  );
  return deletedAuthorization;
};
```
