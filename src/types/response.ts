import {
  AccountType,
  BalanceType,
  BrokerageType,
  Contribution,
  CurrencyType,
  Dividends,
  DividendsTimeline,
  InvestmentAccountType,
  ManualTradeSymbolType,
  OptionPosition,
  OrderType,
  PortfolioGroupPositionType,
  PortfolioGroupType,
  PositionType,
  ReturnRateTimeframe,
  SymbolType,
  Timeframe,
  TradeType,
  UniversalSymbolType,
} from './general';

export interface ResponseType {
  meta: { status: number; statusText: string };
}

export interface ApiStatusResponseType extends ResponseType {
  data: {
    version: number;
    timestamp: string;
    online: boolean;
  };
}

export interface RetrieveJWTResponseType extends ResponseType {
  data: {
    sharedKey: string;
    encryptedMessageData: {
      encryptedMessage: string;
      tag: string;
      nonce: string;
    };
  };
}

export interface RegisterUserResponseType extends ResponseType {
  data: {
    userId: string;
    userSecret: string;
  };
}

export interface DeleteUserResponseType extends ResponseType {
  data: {
    status: string;
    userId: string;
  };
}

export interface RedirectURIResponseType extends ResponseType {
  data: {
    redirectURI: string;
  };
}

export interface UserHoldingsResponseType extends ResponseType {
  data: {
    account: AccountType;
    balances: BalanceType[];
    positions: PositionType[];
    option_positions: OptionPosition[];
    orders: OrderType[];
    errors: null | string;
    total_value: {
      currency: string;
      value: number;
    };
  };
}

export interface AccountHoldingsResponseType extends ResponseType {
  data: {
    account: AccountType;
    balances: BalanceType[];
    positions: PositionType[];
    option_positions: OptionPosition[];
    orders: OrderType[];
    cache_timestamp: string;
    cache_expiry: string;
    cache_expired: string;
  };
}

export interface AccountResponseType extends ResponseType {
  data: AccountType;
}

export interface AccountsResponseType extends ResponseType {
  data: AccountType[];
}

export interface BalanceResponseType extends ResponseType {
  data: BalanceType[];
}

export interface AccountPositionsResponseType extends ResponseType {
  data: {
    symbol: {
      symbol: SymbolType;
    };
    price: number;
    open_pnl: number | null;
    fractional_units: number | null;
    units: number;
    average_purchase_price: number;
  }[];
}

export interface OrderResponseType extends ResponseType {
  data: OrderType;
}

export interface OrderImpactResponseType extends ResponseType {
  data: {
    trade: TradeType;
    trade_impacts: {
      id: string;
      account: AccountType;
      order_type: string;
      time_in_force: 'FOK' | 'Day';
      symbol: ManualTradeSymbolType;
      action: string;
      units: number;
      price: number;
    };
    combined_remaining_balance: {
      account: AccountType;
      currency: CurrencyType;
      cash: number;
    };
  };
}

export interface MultipleTradesOrderImpactResponseType extends ResponseType {
  data: {
    account: InvestmentAccountType;
    currency: CurrencyType;
    remaining_cash: number;
    estimated_commissions: number;
    forex_fees: number;
  };
}

export interface SecurityTypeResponseType extends ResponseType {
  data: {
    id: string;
    code: string;
    description: string;
    is_supported: boolean;
  };
}

export interface BrokerageResponseType extends ResponseType {
  data: BrokerageType[];
}

export interface BrokerageAuthResponseType extends ResponseType {
  data: {
    id: string;
    created: number;
    brokerage: BrokerageType;
    type: string;
  };
}

export interface BrokerageAuthorizationTypeObjectResponseType
  extends ResponseType {
  data: {
    id: string;
    type: 'read' | 'trade';
    auth_type: string;
    brokerage: {
      id: string;
      name: string;
      slug: string;
    };
  };
}

export interface TransactionHistoryResponseType extends ResponseType {
  data: {
    account: AccountType;
    amount: number;
    currency: CurrencyType;
    description: string;
    fee: number;
    institution: string;
    price: number;
    settlement_date: string;
    symbol: SymbolType;
    trade_date: string;
    type: string;
    units: number;
  };
}

export interface PerformanceInformationResponseType extends ResponseType {
  data: {
    totalEquityTimeframe: Timeframe[];
    contributions: Contribution;
    contributionTimeframe: Timeframe[];
    contributionTimeframeCumulative: Timeframe[];
    withdrawalTimeframe: Timeframe[];
    contributionStreak: number;
    contributionMonthsContributed: number;
    contributionTotalMonths: number;
    dividendIncome: number;
    monthlyDividends: number;
    dividends: Dividends[];
    badTickers: any[];
    dividendTimeline: DividendsTimeline[];
    commissions: number;
    forexFees: number;
    fees: number;
    feeSavings: number;
    rateOfReturn: number;
    returnRateTimeframe: ReturnRateTimeframe[];
    detailedMode: boolean;
  };
}

export interface SymbolsQuoteResponseType extends ResponseType {
  data: {
    symbol: UniversalSymbolType;
    bid_price: number;
    ask_price: number;
    last_trade_price: number;
    bid_size: number;
    ask_size: number;
  };
}

export interface StockExchangeResponseType extends ResponseType {
  data: {
    id: string;
    code: string;
    mic_code: string;
    name: string;
    timezone: string;
    start_time: string;
    close_time: string;
    suffix: string;
  };
}

export interface CurrencyResponseType extends ResponseType {
  data: CurrencyType[];
}

export interface ExchangeRateResponseType extends ResponseType {
  data: {
    src: CurrencyType;
    dst: CurrencyType;
    exchange_rate: number;
  };
}

export interface UniversalSymbolResponseType extends ResponseType {
  data: UniversalSymbolType;
}

export interface PortfolioGroupResponseType extends ResponseType {
  data: PortfolioGroupType[];
}

export interface PortfolioGroupPositionsResponseType extends ResponseType {
  data: PortfolioGroupPositionType[];
}
