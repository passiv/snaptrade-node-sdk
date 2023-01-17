## Trading endpoints

### _orders history_

Get all history of orders placed in account

##### Signature:

```typescript
fetchOrdersHistory(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string,
    extraParams: { status: string; days: number },
    options?: RequestOptionsType
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
    'ACCOUNT_ID',
    {
      status: 'all' | 'open' | 'executed', // defaults to all if not passed in
      days: 90, // defaults to 90 if not passed in
    },
    { timeout: 65000 } // default timeout is 60000
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
    extraParams: { symbols: string; use_ticker: boolean },
    options?: RequestOptionsType
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
    'ACCOUNT_ID',
    {
      symbols: 'TSLA', // universal_symbol_id or ticker to get quotes for.
      use_ticker: true, // should be set to true if providing tickers.
    },
    { timeout: 65000 }
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
    data: { brokerage_order_id: string },
    options?: RequestOptionsType
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
    'ACCOUNT_ID',
    {
      brokerage_order_id: 'BROKER_ORDER_ID',
    },
    { timeout: 65000 }
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
  data: OrderImpactBodyParams,
  options?: RequestOptionsType
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
      account_id: 'ACCOUNT_ID',
      action: 'BUY' | 'SELL',
      order_type: 'Limit' | 'Market',
      price: 10,
      time_in_force: 'Day',
      units: 1,
      universal_symbol_id: 'SYMBOL_ID',
    },
    { timeout: 65000 }
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
  tradeId: string,
  options?: RequestOptionsType
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
    'TRADE_ID',
    { timeout: 65000 }
  );
  return placedOrder;
};
```

### _place trade with NO validation_

Place trade with NO validation

##### Signature:

```typescript
placeTradeWithNoValidation(
    { userId, userSecret }: DefaultQueryParams,
    data: OrderImpactBodyParams,
    options?: RequestOptionsType
  ): Promise<PlaceOrderResponseType>
```

##### Example:

```typescript
const placeTradeNoValidation = async () => {
  const placeTrade = await snapTrade.placeTradeWithNoValidation(
    {
      userId: 'USER_ID',
      userSecret: 'USER_SECRET',
    },
    {
      account_id: 'ACCOUNT_ID',
      action: 'BUY',
      order_type: 'Limit',
      price: 70,
      stop: 0,
      time_in_force: 'Day',
      units: 1,
      universal_symbol_id: 'UNIVERSAL_SYMBOL_ID',
    }
  );
  return placeTrade;
};
```
