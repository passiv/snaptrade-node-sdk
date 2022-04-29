## Account Information endpoints

### _user holdings_

List all accounts for the user, plus balances and positions for each account.

##### Signature:

```typescript
fetchUserHoldings({
    userId,
    userSecret,
  }: DefaultQueryParams): Promise<UserHoldingsResponseType>

```

##### Example:

```typescript
const userHoldings = async () => {
  const holdings = await snapTrade.fetchUserHoldings({
    userId: 'USER_ID',
    userSecret: 'USER_SECRET',
  });
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
  }: DefaultQueryParams): Promise<AccountType[]>
```

##### Example:

```typescript
const userAccounts = async () => {
  const accounts = await snapTrade.fetchUserAccounts({
    userId: 'USER_ID',
    userSecret: 'USER_SECRET',
  });
  return accounts;
};
```

### _user account_

Return details of a specific investment account.

##### Signature:

```typescript
fetchAccount(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string
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
    'accountId'
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
    accountId: string
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
    'accountId'
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
    accountId: string
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
    'accountId'
  );
  return accPositions;
};
```
