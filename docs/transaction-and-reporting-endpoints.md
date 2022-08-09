## Transactions and Reporting endpoints

### _transaction history_

Get transaction history for a user

##### Signature:

```typescript
fetchTransactionHistory(
    { userId, userSecret }: DefaultQueryParams,
    extraParams: { startDate: string; endDate: string, accounts: string }
  ): Promise<TransactionHistoryResponseType[]>
```

##### Example:

```typescript
const getTransactionHistory = async () => {
  const transactionHistory = await snapTrade.fetchTransactionHistory(
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    {
      startDate: '2022-01-24', //optional
      endDate: '2022-02-24', //optional
      accounts: '5a1066f1-1338-2418-b3ed-9c13a8ff76e1', //optional comma separated list of account IDs used to filter the request on specific accounts
    }
  );
  return transactionHistory;
};
```
