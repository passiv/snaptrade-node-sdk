## Account Information endpoints

### _user holdings_

List all accounts for the user, plus balances and positions for each account.

##### Signature:

```typescript
fetchUserHoldings(
    { userId, userSecret }: DefaultQueryParams,
     extraParams?: {
      authorizationIds: string[];
    },
    options?: RequestOptionsType
  ): Promise<UserHoldingsResponseType[]>
```

##### Example:

```typescript
const userHoldings = async () => {
  const holdings = await snapTrade.fetchUserHoldings(
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    {
      authorizationIds: [
        'adc69153-3eCe-4s7e-9d8e-9efdb412d030',
        '0ac1xdb1-64xf-4e9e-afdd-a2c02222x2af',
      ],
    },
    { timeout: 65000 } // default timeout is 60000
  );
  return holdings;
};
```

### _user holdings (account specific)_

Get a specific account for the user, plus balances and positions for that account.

##### Signature:

```typescript
fetchAccountHoldings(
  { userId, userSecret }: DefaultQueryParams,
  accountId: string,
  options?: RequestOptionsType
): Promise<AccountHoldingsResponseType>
```

##### Example:

```typescript
const accountHoldings = async () => {
  const holdings = await snapTrade.fetchUserHoldings(
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    'ACCOUNT_ID',
    { timeout: 65000 }
  );
  return holdings;
};
```

### _user accounts_

List all investment accounts for the user.

##### Signature:

```typescript
fetchUserAccounts({
    userId,
    userSecret,
  }: DefaultQueryParams,
    options?: RequestOptionsType
  ): Promise<AccountType[]>
```

##### Example:

```typescript
const userAccounts = async () => {
  const accounts = await snapTrade.fetchUserAccounts(
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    { timeout: 65000 }
  );
  return accounts;
};
```

### _user account_

Return details of a specific investment account.

##### Signature:

```typescript
fetchAccount(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string,  options?: RequestOptionsType
  ): Promise<AccountType>
```

##### Example:

```typescript
const userAccount = async () => {
  const account = await snapTrade.fetchAccount(
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    'ACCOUNT_ID',
    { timeout: 65000 }
  );
  return account;
};
```

### _account balances_

Get all cash balances of an investment account

##### Signature:

```typescript
fetchAccountBalances(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string, options?: RequestOptionsType
  ): Promise<BalanceType[]>
```

##### Example:

```typescript
const accountBalances = async () => {
  const accBalances = await snapTrade.fetchAccountBalances(
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    'ACCOUNT_ID',
    { timeout: 65000 }
  );
  return accBalances;
};
```

### _account positions_

Get all positions of an investment account

##### Signature:

```typescript
fetchAccountPositions(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string, options?: RequestOptionsType
  ): Promise<AccountPositionsResponseType>
```

##### Example:

```typescript
const accountPositions = async () => {
  const accPositions = await snapTrade.fetchAccountPositions(
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    'ACCOUNT_ID',
    { timeout: 65000 }
  );
  return accPositions;
};
```
