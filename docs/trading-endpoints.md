## Trading endpoints

### _orders history_

Get all history of orders placed in account

##### Signature:

```typescript
fetchOrdersHistory(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string,
    extraParams: { status: string; days: number }
  ): Promise<OrderResponseType[]>
```

##### Example:

```typescript
const ordersHistory = async () => {
  const orders = await snapTrade.fetchOrdersHistory(
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    'accountId',
    {
      status: 'all' | 'open' | 'executed', // defaults to all if not passed in
      days: 90, // defaults to 90 if not passed in
    }
  );
  return orders;
};
```

### _symbol quotes_

Get symbol quotes

##### Signature:

```typescript
fetchSymbolsQuote(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string,
    extraParams: { symbols: string; use_ticker: boolean }
  ): Promise<SymbolsQuoteResponseType>
```

##### Example:

```typescript
const symbolQuotes = async () => {
  const quotes = await snapTrade.fetchSymbolsQuote(
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    'accountId',
    {
      symbols: 'TSLA', // universal_symbol_id or ticker to get quotes for.
      use_ticker: true, // should be set to true if providing tickers.
    }
  );
  return quotes;
};
```

### _cancel order_

Cancel open order in account

##### Signature:

```typescript
cancelOpenOrder(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string,
    data: { brokerage_order_id: string }
  ): Promise<OrderResponseType>
```

##### Example:

```typescript
const cancelOrder = async () => {
  const cancel = await snapTrade.cancelOpenOrder(
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    'accountId',
    {
      brokerage_order_id: 'BROKERORDERID',
    }
  );
  return cancel;
};
```

### _order impact_

Check impact of trades on account

##### Signature:

```typescript
orderImpact(
    { userId, userSecret }: DefaultQueryParams,
    data: OrderImpactBodyParams
  ): Promise<OrderImpactResponseType>
```

##### Example:

```typescript
const orderImpact = async () => {
  const impact = await snapTrade.orderImpact(
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    {
      account_id: 'id',
      action: 'BUY' | 'SELL',
      order_type: 'Limit' | 'Market',
      price: 10,
      time_in_force: 'Day',
      units: 1,
      universal_symbol_id: 'symbolid',
    }
  );
  return impact;
};
```

### _place order_

Place order

##### Signature:

```typescript
placeOrder(
    { userId, userSecret }: DefaultQueryParams,
    tradeId: string
  ): Promise<OrderResponseType>
```

##### Example:

```typescript
const placeOrder = async () => {
  const placedOrder = await snapTrade.placeOrder(
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    'tradeId'
  );
  return placedOrder;
};
```
