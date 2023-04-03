## Transactions and Reporting endpoints

### _transaction history_

Get transaction history for a user

##### Signature:

```typescript
fetchTransactionHistory(
  { timeout }: RequestOptionsType,
  { userId, userSecret }: DefaultQueryParams,
    extraParams: { startDate: string; endDate: string, accounts: string, brokerageAuthorizations: string[]; }
  ): Promise<TransactionHistoryResponseType[]>
```

##### Example:

```typescript
const getTransactionHistory = async () => {
  const transactionHistory = await snapTrade.fetchTransactionHistory(
    { timeout: 65000 }, // default timeout is 60000
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    {
      startDate: '2022-01-24', //optional
      endDate: '2022-02-24', //optional
      accounts: '5a1066f1-1338-2418-b3ed-9c13a8ff76e1', //optional comma separated list of account IDs used to filter the request on specific accounts
      brokerageAuthorizations: [
        'adc69153-3eCe-4s7e-9d8e-9efdb412d030',
        '0ac1xdb1-64xf-4e9e-afdd-a2c02222x2af',
      ],
    }
  );
  return transactionHistory;
};
```

### _performance information_

Get performance information for a user

##### Signature:

```typescript
fetchPerformanceInformation(
    { userId, userSecret }: DefaultQueryParams,
    extraParams: { startDate: string; endDate: string; accounts: string; frequency: string; detailed: boolean; },
    { timeout }: RequestOptionsType,
  ): Promise<PerformanceInformationResponseType[]>
```

##### Example:

```typescript
const getPerformanceInformation = async () => {
  const performanceInformation = await snapTrade.fetchPerformanceInformation(
    { timeout: 65000 }, // default timeout is 60000
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    {
      startDate: '2022-01-24', //required
      endDate: '2022-02-24', //required
      accounts: '5a1066f1-1338-2418-b3ed-9c13a8ff76e1', //optional comma separated list of account IDs used to filter the request on specific accounts
      detailed: false, //optional increases frequency of data points for the total value and contribution charts if set to true
      frequency: 'daily', //optional frequency for the rate of return chart (defaults to monthly). Possible values are daily, weekly, monthly, quarterly, yearly.
    }
  );
  return performanceInformation;
};
```
