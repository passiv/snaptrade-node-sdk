## Reference Data endpoints

### _brokerages_

List of all supported brokerages

##### Signature:

```typescript
fetchBrokerages(): Promise<BrokerageType[]>
```

##### Example:

```typescript
const brokerages = async () => {
  const listOfBrokerages = await snapTrade.fetchBrokerages();
  return listOfBrokerages;
};
```

### _currencies_

List of all supported currencies

##### Signature:

```typescript
fetchCurrencies(): Promise<CurrencyType[]>
```

##### Example:

```typescript
const currencies = async () => {
  const supportedCurrencies = await snapTrade.fetchCurrencies();
  return supportedCurrencies;
};
```

### _exchange rate of currencies_

Return the exchange rates of all supported currencies

##### Signature:

```typescript
fetchExchangeCurrencies(): Promise<ExchangeRateType[]>
```

##### Example:

```typescript
const exchangeRates = async () => {
  const supportedCurrenciesExchangeRates =
    await snapTrade.fetchExchangeCurrencies();
  return supportedCurrenciesExchangeRates;
};
```

### _exchange rate of a currency pair_

Return the exchange rate of a currency pair

##### Signature:

```typescript
getCurrencyPair(currencyPair: string): Promise<ExchangeRateType>
```

##### Example:

```typescript
const currencyPair = async () => {
  const exchangeRateCurrencyPair = await snapTrade.getCurrencyPair();
  return exchangeRateCurrencyPair;
};
```

### _search symbols_

Search for symbols

##### Signature:

```typescript
searchSymbols(data: {
    substring: string;
  }): Promise<UniversalSymbolType[]>
```

##### Example:

```typescript
const symbol = async () => {
  const searchedSymbol = await snapTrade.searchSymbols({ substring: 'apple' });
  return searchedSymbol;
};
```

### _symbol details by symbol id_

Get details of a symbol

##### Signature:

```typescript
getSymbolDetailById(symbolId: string): Promise<UniversalSymbolType>
```

##### Example:

```typescript
const symbolDetail = async () => {
  const symbol = await snapTrade.getSymbolDetailById("symbolId");
  return symbol
```

### _symbol details by ticker_

Get details of a symbol by the ticker

##### Signature:

```typescript
getSymbolDetailByTicker(ticker: string): Promise<UniversalSymbolType>
```

##### Example:

```typescript
const symbolDetail = async () => {
  const symbol = await snapTrade.getSymbolDetailByTicker("TSLA");
  return symbol
```

### _security types_

Get a list of all defined security types

##### Signature:

```typescript
fetchListOfSecurityTypes(): Promise<SecurityType[]>
```

##### Example:

```typescript
const securityTypes = async () => {
  const listOfSecurityTypes = await snapTrade.fetchListOfSecurityTypes();
  return listOfSecurityTypes
```

### _brokerage authorization types_

Get a list of all defined Brokerage Authorization Type objects

##### Signature:

```typescript
fetchListOfBrokerageAuthorizationTypes(extraParams: {
    brokerage: string[];
  }): Promise<BrokerageAuthorizationTypeObject[]>
```

##### Example:

```typescript
const brokerageAuthorizationTypesObject = async () => {
  const listOfBrokerageAuthorizationTypesObject = await snapTrade.fetchListOfBrokerageAuthorizationTypes( {
      brokerage: ['QUESTRADE', 'ALPACA']
    });
  return listOfBrokerageAuthorizationTypesObject
```

### _stock exchanges and suffixes_

Get a list of stock exchanges and their suffixes

##### Signature:

```typescript
fetchListOfStockExchanges(): Promise<StockExchange[]>
```

##### Example:

```typescript
const getStockExchangesAndSuffixes = async () => {
  const listOfStockExchangesAndSuffixes =
    await snapTrade.fetchListOfStockExchanges();
  return listOfStockExchangesAndSuffixes;
};
```

### _partner data_

Get data relevant to the partner

##### Signature:

```typescript
partnerData(): Promise<PartnerDataResponseType>
```

##### Example:

```typescript
const getPartnerData = async () => {
  const partnerData = await snapTrade.partnerData();
  return partnerData;
};
```
