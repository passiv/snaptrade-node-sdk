import { DefaultQueryParams, OrderImpactBodyParams } from './option-types';
import {
  AccountPositionsResponseType,
  AccountResponseType,
  BalanceResponseType,
  BrokerageAuthorizationTypeObjectResponseType,
  BrokerageAuthResponseType,
  BrokerageResponseType,
  CurrencyResponseType,
  DeleteUserResponseType,
  ExchangeRateResponseType,
  MultipleTradesOrderImpactResponseType,
  OrderImpactResponseType,
  OrderResponseType,
  PortfolioGroupPositionsResponseType,
  PortfolioGroupResponseType,
  RedirectURIResponseType,
  RegisterUserResponseType,
  SecurityTypeResponseType,
  StockExchangeResponseType,
  SymbolsQuoteResponseType,
  TransactionHistoryResponseType,
  UniversalSymbolResponseType,
  UserHoldingsResponseType,
} from './response-types';

import { request } from './request';

/**
 * @class SnapTradeFetch
 */

class SnapTradeFetch {
  clientId: string;
  consumerKey: string;

  /**
   * Creates an instance of SnapTrade fetch.
   * @param {string} clientId - SnapTrade Client ID (generated and provided to partner by Passiv)
   * @param {string} consumerKey - SnapTrade Consumer Key (generated and provided to partner by Passiv)
   */
  constructor(clientId: string, consumerKey: string) {
    this.clientId = clientId;
    this.consumerKey = consumerKey;
  }

  /** Authentication **/

  /**
   * Register user with SnapTrade
   * in order to create secure brokerage authorizations.
   * @param {string} userId - SnapTrade User ID
   * @returns Promise<RegisterUserResponseType>
   */
  async registerUser(userId: string): Promise<RegisterUserResponseType> {
    const response = await request({
      endpoint: '/api/v1/snapTrade/registerUser',
      method: 'post',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
      data: {
        userId,
      },
    });
    return response as Promise<RegisterUserResponseType>;
  }

  /**
   * Delete user, disabling all brokerage
   * authorizations and permanently deleting all data associated with the user.
   * @param {DefaultQueryParams} defaultQueryParams
   * @returns Promise<DeleteUserResponseType>
   */
  async deleteUser({
    userId,
    userSecret,
  }: DefaultQueryParams): Promise<DeleteUserResponseType> {
    const response = await request({
      endpoint: '/api/v1/snapTrade/deleteUser',
      method: 'post',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<DeleteUserResponseType>;
  }

  /**
   * Generate a redirect URI to securely login a user to the SnapTrade Connection Portal.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {broker: string, immediateRedirect: boolean, customRedirect: string} data
   * @returns Promise<RedirectURIResponseType>
   */

  async generateRedirectURI(
    { userId, userSecret }: DefaultQueryParams,
    data: { broker: string; immediateRedirect: boolean; customRedirect: string }
  ): Promise<RedirectURIResponseType> {
    const response = await request({
      endpoint: '/api/v1/snapTrade/login',
      method: 'post',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
      data,
    });
    return response as Promise<RedirectURIResponseType>;
  }

  /** Account Information **/

  /**
   * List all accounts for the user, plus balances and positions for each account.
   * @param {DefaultQueryParams} defaultQueryParams
   * @returns Promise<UserHoldingsResponseType>
   */
  async fetchUserHoldings({
    userId,
    userSecret,
  }: DefaultQueryParams): Promise<UserHoldingsResponseType> {
    const response = await request({
      endpoint: '/api/v1/holdings',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<UserHoldingsResponseType>;
  }

  /**
   * List all investment accounts for the user.
   * @param {DefaultQueryParams} defaultQueryParams
   * @returns Promise<AccountResponseType[]>
   */
  async fetchUserAccounts({
    userId,
    userSecret,
  }: DefaultQueryParams): Promise<AccountResponseType[]> {
    const response = await request({
      endpoint: '/api/v1/accounts',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<AccountResponseType[]>;
  }

  /**
   * Return details of a specific investment account.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {string} accountId
   * @returns Promise<AccountResponseType>
   */
  async fetchAccount(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string
  ): Promise<AccountResponseType> {
    const response = await request({
      endpoint: `/api/v1/accounts/${accountId}`,
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<AccountResponseType>;
  }

  /**
   * Get all cash balances of an investment account.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {string} accountId
   * @returns Promise<BalanceResponseType>
  
   */
  async fetchAccountBalances(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string
  ): Promise<BalanceResponseType> {
    const response = await request({
      endpoint: `/api/v1/accounts/${accountId}/balances`,
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<BalanceResponseType>;
  }

  /**
   * Get all positions of an investment account.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {string} accountId
   * @returns Promise<AccountPositionsResponseType>
   */
  async fetchAccountPositions(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string
  ): Promise<AccountPositionsResponseType> {
    const response = await request({
      endpoint: `/api/v1/accounts/${accountId}/positions`,
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<AccountPositionsResponseType>;
  }

  /** Trading **/

  /**
   * Get all history of orders placed in account.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {string} accountId
   * @param { status: string; days: number } extraParams
   * @returns Promise<OrdersResponseType[]>
   */
  async fetchOrdersHistory(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string,
    extraParams: { status: string; days: number }
  ): Promise<OrderResponseType[]> {
    const response = await request({
      endpoint: `/api/v1/accounts/${accountId}/orders`,
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
      extraParams,
    });
    return response as Promise<OrderResponseType[]>;
  }

  /**
   * Cancel open order in account.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {string} accountId
   * @param {brokerage_order_id: string} data
   * @returns Promise<OrderResponseType>
   */
  async cancelOpenOrder(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string,
    data: { brokerage_order_id: string }
  ): Promise<OrderResponseType> {
    const response = await request({
      endpoint: `/api/v1/accounts/${accountId}/orders/cancel`,
      method: 'post',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
      data,
    });
    return response as Promise<OrderResponseType>;
  }

  /**
   * Get symbols quote.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {string} accountId
   * @returns Promise<SymbolsQuoteResponseType>
   */
  async fetchSymbolsQuote(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string,
    extraParams: { symbols: string; use_ticker: boolean }
  ): Promise<SymbolsQuoteResponseType> {
    const response = await request({
      endpoint: `/api/v1/accounts/${accountId}/quotes`,
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
      extraParams,
    });
    return response as Promise<SymbolsQuoteResponseType>;
  }

  /**
   * Return the impact of placing a series of trades on the portfolio
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {string} portfolioGroupId
   * @param {string} calculatedTradeId
   * @returns Promise<>
   */
  async multipleTradesOrderImpact(
    { userId, userSecret }: DefaultQueryParams,
    portfolioGroupId: string,
    calculatedTradeId: string
  ): Promise<MultipleTradesOrderImpactResponseType[]> {
    const response = await request({
      endpoint: `/api/v1/portfolioGroups/${portfolioGroupId}/calculatedtrades/${calculatedTradeId}`,
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<MultipleTradesOrderImpactResponseType[]>;
  }

  /**
   * Check impact of trades on account.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {OrderImpactBodyParams} data
   * @returns Promise<OrderImpactResponseType>
   */
  async orderImpact(
    { userId, userSecret }: DefaultQueryParams,
    data: OrderImpactBodyParams
  ): Promise<OrderImpactResponseType> {
    const response = await request({
      endpoint: '/api/v1/trade/impact',
      method: 'post',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
      data,
    });
    return response as Promise<OrderImpactResponseType>;
  }

  /**
   * Place order.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {string} tradeId
   * @returns Promise<OrderResponseType>
   */
  async placeOrder(
    { userId, userSecret }: DefaultQueryParams,
    tradeId: string
  ): Promise<OrderResponseType> {
    const response = await request({
      endpoint: `/api/v1/trade/${tradeId}`,
      method: 'post',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<OrderResponseType>;
  }

  /** Connections **/

  /**
   * List all brokerage authorizations for the user.
   * @param {DefaultQueryParams} defaultQueryParams
   * @returns Promise<BrokerageAuthResponseType[]>
   */
  async fetchBrokerageAuthorizations({
    userId,
    userSecret,
  }: DefaultQueryParams): Promise<BrokerageAuthResponseType[]> {
    const response = await request({
      endpoint: '/api/v1/authorizations',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<BrokerageAuthResponseType[]>;
  }

  /**
   * Get detail of a specific brokerage authorizations for the user.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {string} authorizationId
   * @returns Promise<BrokerageAuthResponseType>
   */
  async fetchAuthorization(
    { userId, userSecret }: DefaultQueryParams,
    authorizationId: string
  ): Promise<BrokerageAuthResponseType> {
    const response = await request({
      endpoint: `/api/v1/authorizations/${authorizationId}`,
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<BrokerageAuthResponseType>;
  }

  /**
   * Remove a brokerage authorization.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {string} authorizationId
   * @returns Promise<BrokerageAuthResponseType>
   */
  async deleteAuthorization(
    { userId, userSecret }: DefaultQueryParams,
    authorizationId: string
  ): Promise<BrokerageAuthResponseType> {
    const response = await request({
      endpoint: `/api/v1/authorizations/${authorizationId}`,
      method: 'delete',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<BrokerageAuthResponseType>;
  }

  /** Reference Data **/

  /**
   * List of all supported brokerages.
   * @returns Promise<BrokerageResponseType[]>
   */
  async fetchBrokerages(): Promise<BrokerageResponseType[]> {
    const response = await request({
      endpoint: '/api/v1/brokerages',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
    });
    return response as Promise<BrokerageResponseType[]>;
  }

  /**
   * List of all supported currencies.
   * @returns Promise<CurrencyResponseType>
   */
  async fetchCurrencies(): Promise<CurrencyResponseType> {
    const response = await request({
      endpoint: '/api/v1/currencies',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
    });
    return response as Promise<CurrencyResponseType>;
  }

  /**
   * Return the exchange rates of all supported currencies.
   * @returns Promise<ExchangeRateResponseType[]>
   */
  async fetchExchangeCurrencies(): Promise<ExchangeRateResponseType[]> {
    const response = await request({
      endpoint: '/api/v1/currencies/rates',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
    });
    return response as Promise<ExchangeRateResponseType[]>;
  }

  /**
   * Return the exchange rate of a currency pair.
   * @param {string} currencyPair
   * @returns Promise<ExchangeRateType>
   */
  async getCurrencyPair(
    currencyPair: string
  ): Promise<ExchangeRateResponseType> {
    const response = await request({
      endpoint: `/api/v1/currencies/rates/${currencyPair}`,
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
    });
    return response as Promise<ExchangeRateResponseType>;
  }

  /**
   * Search for symbols.
   * @param {substring: string} data
   * @returns Promise<UniversalSymbolResponseType>
   */
  async searchSymbols(data: {
    substring: string;
  }): Promise<UniversalSymbolResponseType> {
    const response = await request({
      endpoint: '/api/v1/symbols',
      method: 'post',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
      data,
    });
    return response as Promise<UniversalSymbolResponseType>;
  }

  /**
   * Get details of a symbol.
   * @param {string} symbolId
   * @returns Promise<UniversalSymbolType>
   */
  async getSymbolDetailById(
    symbolId: string
  ): Promise<UniversalSymbolResponseType> {
    const response = await request({
      endpoint: `/api/v1/symbols/${symbolId}`,
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
    });
    return response as Promise<UniversalSymbolResponseType>;
  }

  /**
   * Get details of a symbol by the ticker.
   * @param {string} ticker
   * @returns Promise<UniversalSymbolResponseType>
   */
  async getSymbolDetailByTicker(
    ticker: string
  ): Promise<UniversalSymbolResponseType> {
    const response = await request({
      endpoint: `/api/v1/symbols/${ticker}`,
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
    });
    return response as Promise<UniversalSymbolResponseType>;
  }

  /**
   * Get a list of all defined security types
   * @returns Promise<SecurityTypeResponseType[]>
   */
  async fetchListOfSecurityTypes(): Promise<SecurityTypeResponseType[]> {
    const response = await request({
      endpoint: '/api/v1/securityTypes',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
    });
    return response as Promise<SecurityTypeResponseType[]>;
  }

  /**
   * Get a list of all defined Brokerage Authorization Type objects
   * @param { brokerage: string[] } extraParams
   * @returns Promise<BrokerageAuthorizationTypeObjectResponseType[]>
   */
  async fetchListOfBrokerageAuthorizationTypes(extraParams: {
    brokerage: string[];
  }): Promise<BrokerageAuthorizationTypeObjectResponseType[]> {
    const extraParamsToString = {
      brokerage: extraParams.brokerage.toString(),
    };
    const response = await request({
      endpoint: '/api/v1/brokerageAuthorizationTypes',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
      extraParams: extraParamsToString,
    });
    return response as Promise<BrokerageAuthorizationTypeObjectResponseType[]>;
  }

  /**
   * Get a list of stock exchanges and their suffixes
   * @returns Promise<StockExchangeResponseType[]>
   */
  async fetchListOfStockExchanges(): Promise<StockExchangeResponseType[]> {
    const response = await request({
      endpoint: '/api/v1/exchanges',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
    });
    return response as Promise<StockExchangeResponseType[]>;
  }

  /** Portfolio Management **/

  /**
   * List of all portfolio groups.
   * @param {DefaultQueryParams} defaultQueryParams
   * @returns Promise<PortfolioGroupResponseType>
   */
  async fetchPortfolioGroups({
    userId,
    userSecret,
  }: DefaultQueryParams): Promise<PortfolioGroupResponseType> {
    const response = await request({
      endpoint: '/api/v1/portfolioGroups',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<PortfolioGroupResponseType>;
  }

  /**
   * List Portfolio Group positions.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param portfolioGroupId
   * @returns Promise<PortfolioGroupPositionsResponseType>
   */
  async fetchPortfolioGroupPrositions(
    { userId, userSecret }: DefaultQueryParams,
    portfolioGroupId: string
  ): Promise<PortfolioGroupPositionsResponseType> {
    const response = await request({
      endpoint: `/api/v1/portfolioGroups/${portfolioGroupId}/positions`,
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<PortfolioGroupPositionsResponseType>;
  }

  /** Reporting **/

  /**
   * Get transaction history for a user
   * @param {DefaultQueryParams} defaultQueryParams
   * @param { startDate: string; endDate: string } extraParams
   * @returns Promise<TransactionHistoryResponseType[]>
   */
  async fetchTransactionHistory(
    { userId, userSecret }: DefaultQueryParams,
    extraParams: { startDate: string; endDate: string }
  ): Promise<TransactionHistoryResponseType[]> {
    const response = await request({
      endpoint: '/api/v1/activities',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
      extraParams,
    });
    return response as Promise<TransactionHistoryResponseType[]>;
  }
}

module.exports = SnapTradeFetch;
