import { request } from './request';
import { RequestOptionsType } from './types/general';
import {
  DefaultQueryParams,
  OrderImpactBodyParams,
  PerformanceInformationQueryParams,
} from './types/params';
import {
  AccountPositionsResponseType,
  AccountResponseType,
  AccountsResponseType,
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
  RetrieveJWTResponseType,
  AccountHoldingsResponseType,
  PerformanceInformationResponseType,
  PartnerDataResponseType,
  CancelOrderResponseType,
  PlaceOrderResponseType,
  DeleteAuthorizationResponseType,
  BrokerageAuthsResponseType,
  UsersResponseType,
} from './types/response';

import { privateDecrypt, constants, createDecipheriv } from 'crypto';
import * as fs from 'fs';
import NodeRSA = require('node-rsa');

/**
 * @class SnapTradeFetch
 */

export class SnapTradeFetch {
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

  /** Helper Functions */

  /**
   * Generate RSA private/public key
   * @param {string} path - path to store the private key
   * @returns string
   */
  generateRSA(path: string): string {
    const key = new NodeRSA({ b: 4096 });
    const publicKey = key.exportKey('openssh-public');
    const privateKey = key.exportKey('pkcs8-private-pem');

    try {
      fs.writeFileSync(path, JSON.stringify({ privateKey }));
      return publicKey;
    } catch (err) {
      return JSON.stringify(err);
    }
  }

  /**
   * Decrypt encrypted shared key
   * @param {string} privateKeyFilePath - path to retrieve the private key
   * @param {string} encryptedSharedKey - encrypted shared key
   * @returns string
   */
  decryptSharedKey(
    privateKeyFilePath: string,
    encryptedSharedKey: string
  ): string {
    try {
      const rawFile = fs.readFileSync(privateKeyFilePath);
      const privateKey = JSON.parse(rawFile.toString()).privateKey;
      if (privateKey) {
        const buffer = Buffer.from(encryptedSharedKey, 'base64');
        const decryptedKey = privateDecrypt(
          {
            key: privateKey.toString(),
            padding: constants.RSA_PKCS1_OAEP_PADDING,
          },
          buffer
        );
        return decryptedKey.toString();
      } else {
        throw 'Cannot find the private key. Please check the path provided and make sure the JSON file with a privateKey exists.';
      }
    } catch (err) {
      return JSON.stringify(err);
    }
  }

  /**
   * Decrypt encrypted message
   * @param {string} sharedKey
   * @param {encryptedMessage: string, tag: string, nonce: string} encryptedMessageData
   * @returns string
   */
  decryptMessage(
    sharedKey: string,
    encryptedMessageData: {
      encryptedMessage: string;
      tag: string;
      nonce: string;
    }
  ): string {
    let iv = Buffer.from(encryptedMessageData.nonce).toString('base64');

    let encryptedText = Buffer.from(
      encryptedMessageData.encryptedMessage
    ).toString('base64');
    // @ts-ignore
    let decipher = createDecipheriv('aes-256-ocb', Buffer.from(sharedKey), iv, {
      authTagLength: 32,
    });
    // @ts-ignore
    let decrypted = decipher.update(encryptedText);
    // @ts-ignore
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }

  /** Authentication **/

  /**
   * Retrieve encrypted JWT token
   * @param {DefaultQueryParams} defaultQueryParams
   * @returns  Promise<RetrieveJWTResponseType>
   */

  async retrieveJWT({
    userId,
    userSecret,
  }: DefaultQueryParams): Promise<RetrieveJWTResponseType> {
    const response = await request({
      endpoint: '/api/v1/snapTrade/encryptedJWT',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });

    return response as Promise<RetrieveJWTResponseType>;
  }

  /**
   * Register user with SnapTrade
   * in order to create secure brokerage authorizations.
   * @param {userId: string, rsaPublicKey?: string} data
   * @returns Promise<RegisterUserResponseType>
   */
  async registerUser(data: {
    userId: string;
    rsaPublicKey?: string;
  }): Promise<RegisterUserResponseType> {
    const response = await request({
      endpoint: '/api/v1/snapTrade/registerUser',
      method: 'post',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
      data,
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
   * @param {broker: string, immediateRedirect: boolean, customRedirect: string, reconnect: string} data
   * @returns Promise<RedirectURIResponseType>
   */

  async generateRedirectURI(
    { userId, userSecret }: DefaultQueryParams,
    data?: {
      broker?: string;
      immediateRedirect?: boolean;
      customRedirect?: string;
      reconnect?: string;
      connectionType?: string;
    }
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

  /**
   * Get a list of all SnapTrade users that partner has registered on their platform
   * @returns Promise<UsersResponseType>
   */
  async listUsers(): Promise<UsersResponseType> {
    const response = await request({
      endpoint: '/api/v1/snapTrade/listUsers',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
    });
    return response as Promise<UsersResponseType>;
  }

  /** Account Information **/

  /**
   * List all accounts for the user, plus balances and positions for each account.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param { authorizationIds: string[] } extraParams
   * @param {RequestOptionsType} [options]
   * @returns Promise<UserHoldingsResponseType>
   */
  async fetchUserHoldings(
    { userId, userSecret }: DefaultQueryParams,
    extraParams?: {
      authorizationIds: string[];
    },
    options?: RequestOptionsType
  ): Promise<UserHoldingsResponseType> {
    const extraParamsToString = {
      brokerage_authorizations: extraParams?.authorizationIds.toString(),
    };

    const response = await request({
      endpoint: '/api/v1/holdings',
      method: 'get',
      timeout: options?.timeout,
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
      extraParams: extraParamsToString.brokerage_authorizations
        ? extraParamsToString
        : null,
    });
    return response as Promise<UserHoldingsResponseType>;
  }

  /**
   * Get a specific account for the user, plus balances and positions for that account.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param accountId: string
   * @param {RequestOptionsType} [options]
   * @returns Promise<AccountHoldingsResponseType>
   */
  async fetchAccountHoldings(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string,
    options?: RequestOptionsType
  ): Promise<AccountHoldingsResponseType> {
    const response = await request({
      endpoint: `/api/v1/accounts/${accountId}/holdings`,
      method: 'get',
      timeout: options?.timeout,
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<AccountHoldingsResponseType>;
  }

  /**
   * List all investment accounts for the user.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {RequestOptionsType} [options]
   * @returns Promise<AccountsResponseType>
   */
  async fetchUserAccounts(
    { userId, userSecret }: DefaultQueryParams,
    options?: RequestOptionsType
  ): Promise<AccountsResponseType> {
    const response = await request({
      endpoint: '/api/v1/accounts',
      method: 'get',
      timeout: options?.timeout,
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<AccountsResponseType>;
  }

  /**
   * Return details of a specific investment account.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {string} accountId
   * @param {RequestOptionsType} [options]
   * @returns Promise<AccountResponseType>
   */
  async fetchAccount(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string,
    options?: RequestOptionsType
  ): Promise<AccountResponseType> {
    const response = await request({
      endpoint: `/api/v1/accounts/${accountId}`,
      method: 'get',
      timeout: options?.timeout,
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
   * @param {string} accountId\
   * @param {RequestOptionsType} [options]
   * @returns Promise<BalanceResponseType>
  
   */
  async fetchAccountBalances(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string,
    options?: RequestOptionsType
  ): Promise<BalanceResponseType> {
    const response = await request({
      endpoint: `/api/v1/accounts/${accountId}/balances`,
      method: 'get',
      timeout: options?.timeout,
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
   * @param {RequestOptionsType} [options]
   * @returns Promise<AccountPositionsResponseType>
   */
  async fetchAccountPositions(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string,
    options?: RequestOptionsType
  ): Promise<AccountPositionsResponseType> {
    const response = await request({
      endpoint: `/api/v1/accounts/${accountId}/positions`,
      method: 'get',
      timeout: options?.timeout,
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
   * @param {RequestOptionsType} [options]
   * @returns Promise<OrdersResponseType>
   */
  async fetchOrdersHistory(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string,
    extraParams?: { status?: string; days?: number },
    options?: RequestOptionsType
  ): Promise<OrderResponseType> {
    const response = await request({
      endpoint: `/api/v1/accounts/${accountId}/orders`,
      method: 'get',
      timeout: options?.timeout,
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
      extraParams,
    });
    return response as Promise<OrderResponseType>;
  }

  /**
   * Cancel open order in account.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {string} accountId
   * @param {brokerage_order_id: string} data
   * @param {RequestOptionsType} [options]
   * @returns Promise<CancelOrderResponseType>
   */
  async cancelOpenOrder(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string,
    data: { brokerage_order_id: string },
    options?: RequestOptionsType
  ): Promise<CancelOrderResponseType> {
    const response = await request({
      endpoint: `/api/v1/accounts/${accountId}/orders/cancel`,
      method: 'post',
      timeout: options?.timeout,
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
      data,
    });
    return response as Promise<CancelOrderResponseType>;
  }

  /**
   * Get symbols quote.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {string} accountId
   * @param {RequestOptionsType} [options]
   * @returns Promise<SymbolsQuoteResponseType>
   */
  async fetchSymbolsQuote(
    { userId, userSecret }: DefaultQueryParams,
    accountId: string,
    extraParams: { symbols: string; use_ticker?: boolean },
    options?: RequestOptionsType
  ): Promise<SymbolsQuoteResponseType> {
    const response = await request({
      endpoint: `/api/v1/accounts/${accountId}/quotes`,
      method: 'get',
      timeout: options?.timeout,
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
   * @param {RequestOptionsType} [options]
   * @returns Promise<MultipleTradesOrderImpactResponseType>
   */
  async multipleTradesOrderImpact(
    { userId, userSecret }: DefaultQueryParams,
    portfolioGroupId: string,
    calculatedTradeId: string,
    options?: RequestOptionsType
  ): Promise<MultipleTradesOrderImpactResponseType> {
    const response = await request({
      endpoint: `/api/v1/portfolioGroups/${portfolioGroupId}/calculatedtrades/${calculatedTradeId}`,
      method: 'get',
      timeout: options?.timeout,
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<MultipleTradesOrderImpactResponseType>;
  }

  /**
   * Check impact of trades on account.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {OrderImpactBodyParams} data
   * @param {RequestOptionsType} [options]
   * @returns Promise<OrderImpactResponseType>
   */
  async orderImpact(
    { userId, userSecret }: DefaultQueryParams,
    data: OrderImpactBodyParams,
    options?: RequestOptionsType
  ): Promise<OrderImpactResponseType> {
    const response = await request({
      endpoint: '/api/v1/trade/impact',
      method: 'post',
      timeout: options?.timeout,
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
   * @param {RequestOptionsType} [options]
   * @returns Promise<PlaceOrderResponseType>
   */
  async placeOrder(
    { userId, userSecret }: DefaultQueryParams,
    tradeId: string,
    options?: RequestOptionsType
  ): Promise<PlaceOrderResponseType> {
    const response = await request({
      endpoint: `/api/v1/trade/${tradeId}`,
      method: 'post',
      timeout: options?.timeout,
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<PlaceOrderResponseType>;
  }

  /**
   * Place a trade with NO validation.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {OrderImpactBodyParams} data
   * @param {RequestOptionsType} [options]
   * @returns Promise<PlaceOrderResponseType>
   */
  async placeTradeWithNoValidation(
    { userId, userSecret }: DefaultQueryParams,
    data: OrderImpactBodyParams,
    options?: RequestOptionsType
  ): Promise<PlaceOrderResponseType> {
    const response = await request({
      endpoint: '/api/v1/trade/place',
      method: 'post',
      timeout: options?.timeout,
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
      data,
    });
    return response as Promise<PlaceOrderResponseType>;
  }

  /** Connections **/

  /**
   * List all brokerage authorizations for the user.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {RequestOptionsType} [options]
   * @returns Promise<BrokerageAuthsResponseType>
   */
  async fetchBrokerageAuthorizations(
    { userId, userSecret }: DefaultQueryParams,
    options?: RequestOptionsType
  ): Promise<BrokerageAuthsResponseType> {
    const response = await request({
      endpoint: '/api/v1/authorizations',
      method: 'get',
      timeout: options?.timeout,
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<BrokerageAuthsResponseType>;
  }

  /**
   * Get detail of a specific brokerage authorizations for the user.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {string} authorizationId
   * @param {RequestOptionsType} [options]
   * @returns Promise<BrokerageAuthResponseType>
   */
  async fetchAuthorization(
    { userId, userSecret }: DefaultQueryParams,
    authorizationId: string,
    options?: RequestOptionsType
  ): Promise<BrokerageAuthResponseType> {
    const response = await request({
      endpoint: `/api/v1/authorizations/${authorizationId}`,
      method: 'get',
      timeout: options?.timeout,
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
   * @param {RequestOptionsType} [options]
   * @returns Promise<DeleteAuthorizationResponseType>
   */
  async deleteAuthorization(
    { userId, userSecret }: DefaultQueryParams,
    authorizationId: string,
    options?: RequestOptionsType
  ): Promise<DeleteAuthorizationResponseType> {
    const response = await request({
      endpoint: `/api/v1/authorizations/${authorizationId}`,
      method: 'delete',
      timeout: options?.timeout,
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
    });
    return response as Promise<DeleteAuthorizationResponseType>;
  }

  /** Reference Data **/

  /**
   * List of all supported brokerages.
   * @returns Promise<BrokerageResponseType>
   */
  async fetchBrokerages(): Promise<BrokerageResponseType> {
    const response = await request({
      endpoint: '/api/v1/brokerages',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
    });
    return response as Promise<BrokerageResponseType>;
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
   * @returns Promise<ExchangeRateResponseType>
   */
  async fetchExchangeCurrencies(): Promise<ExchangeRateResponseType> {
    const response = await request({
      endpoint: '/api/v1/currencies/rates',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
    });
    return response as Promise<ExchangeRateResponseType>;
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
   * @returns Promise<SecurityTypeResponseType>
   */
  async fetchListOfSecurityTypes(): Promise<SecurityTypeResponseType> {
    const response = await request({
      endpoint: '/api/v1/securityTypes',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
    });
    return response as Promise<SecurityTypeResponseType>;
  }

  /**
   * Get a list of all defined Brokerage Authorization Type objects
   * @param { brokerage: string[] } extraParams
   * @returns Promise<BrokerageAuthorizationTypeObjectResponseType>
   */
  async fetchListOfBrokerageAuthorizationTypes(extraParams: {
    brokerage: string[];
  }): Promise<BrokerageAuthorizationTypeObjectResponseType> {
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
    return response as Promise<BrokerageAuthorizationTypeObjectResponseType>;
  }

  /**
   * Get a list of stock exchanges and their suffixes
   * @returns Promise<StockExchangeResponseType>
   */
  async fetchListOfStockExchanges(): Promise<StockExchangeResponseType> {
    const response = await request({
      endpoint: '/api/v1/exchanges',
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
    });
    return response as Promise<StockExchangeResponseType>;
  }

  /**
   * Get data relevant to the partner
   * @returns Promise<PartnerDataResponseType>
   */
  async partnerData(): Promise<PartnerDataResponseType> {
    const response = await request({
      endpoint: `/api/v1/snapTrade/partners/`,
      method: 'get',
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
      },
    });
    return response as Promise<PartnerDataResponseType>;
  }

  /** Portfolio Management **/

  /**
   * List of all portfolio groups.
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {RequestOptionsType} [options]
   * @returns Promise<PortfolioGroupResponseType>
   */
  async fetchPortfolioGroups(
    { userId, userSecret }: DefaultQueryParams,
    options?: RequestOptionsType
  ): Promise<PortfolioGroupResponseType> {
    const response = await request({
      endpoint: '/api/v1/portfolioGroups',
      method: 'get',
      timeout: options?.timeout,
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
   * @param {RequestOptionsType} [options]
   * @returns Promise<PortfolioGroupPositionsResponseType>
   */
  async fetchPortfolioGroupPrositions(
    { userId, userSecret }: DefaultQueryParams,
    portfolioGroupId: string,
    options?: RequestOptionsType
  ): Promise<PortfolioGroupPositionsResponseType> {
    const response = await request({
      endpoint: `/api/v1/portfolioGroups/${portfolioGroupId}/positions`,
      method: 'get',
      timeout: options?.timeout,
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
   * @param { startDate: string; endDate: string, accounts: string } extraParams
   * @returns Promise<TransactionHistoryResponseType>
   */
  async fetchTransactionHistory(
    { userId, userSecret }: DefaultQueryParams,
    extraParams?: { startDate?: string; endDate?: string; accounts?: string },
    options?: RequestOptionsType
  ): Promise<TransactionHistoryResponseType> {
    const response = await request({
      endpoint: '/api/v1/activities',
      method: 'get',
      timeout: options?.timeout,
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
      extraParams,
    });
    return response as Promise<TransactionHistoryResponseType>;
  }

  /**
   * Get performance information for a specific time frame
   * @param {DefaultQueryParams} defaultQueryParams
   * @param {PerformanceInformationQueryParams} extraParams
   * @returns Promise<PerformanceInformationResponseType>
   */
  async fetchPerformanceInformation(
    { userId, userSecret }: DefaultQueryParams,
    extraParams: PerformanceInformationQueryParams,
    options?: RequestOptionsType
  ): Promise<PerformanceInformationResponseType> {
    const response = await request({
      endpoint: '/api/v1/performance/custom',
      method: 'get',
      timeout: options?.timeout,
      consumerKey: this.consumerKey,
      defaultQueryParams: {
        clientId: this.clientId,
        userSecret,
        userId,
      },
      extraParams,
    });
    return response as Promise<PerformanceInformationResponseType>;
  }
}
