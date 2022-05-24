## Transactions and Reporting endpoints

### _transaction history_

Get transaction history for a user

##### Signature:

```typescript
fetchTransactionHistory(
    { userId, userSecret }: DefaultQueryParams,
    extraParams: { startDate: string; endDate: string }
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
      startDate: '2022-01-24',
      endDate: '2022-02-24',
    }
  );
  return transactionHistory;
};
```
