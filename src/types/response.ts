import {
  AccountType,
  BalanceType,
  BrokerageAuthorizationType,
  BrokerageType,
  Contribution,
  CurrencyType,
  Dividends,
  DividendsTimeline,
  ManualTradeSymbolType,
  OptionPosition,
  OrderType,
  PortfolioGroupPositionType,
  PortfolioGroupType,
  PositionType,
  ReturnRateTimeframe,
  Timeframe,
  TradeImpactType,
  UniversalSymbolType,
  _AccountType,
} from './general';

export interface ResponseType {
  meta: { status: number; statusText: string };
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

export interface UsersResponseType extends ResponseType {
  data: string[];
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
  }[];
}

export interface AccountHoldingsResponseType extends ResponseType {
  data: {
    account: _AccountType;
    positions: PositionType[];
    balances: {
      currency: CurrencyType;
      cash: number;
    }[];
    orders: OrderType[];
    option_positions: OptionPosition[];
    cache_timestamp: string;
    cache_expiry: string;
    cache_expired: boolean;
  };
}

export interface AccountResponseType extends ResponseType {
  data: _AccountType;
}

export interface AccountsResponseType extends ResponseType {
  data: _AccountType[];
}

export interface BalanceResponseType extends ResponseType {
  data: {
    cash: number;
    currency: CurrencyType;
  }[];
}

export interface AccountPositionsResponseType extends ResponseType {
  data: PositionType[];
}

export interface OrderResponseType extends ResponseType {
  data: OrderType[];
}

export interface PlaceOrderResponseType extends ResponseType {
  data: OrderType;
}

export interface CancelOrderResponseType extends ResponseType {
  data: OrderType;
}

export interface OrderImpactResponseType extends ResponseType {
  data: {
    trade: {
      id: string;
      account: string;
      order_type: string;
      time_in_force: 'FOK' | 'Day';
      symbol: ManualTradeSymbolType;
      action: string;
      units: number;
      price: number;
    };
    trade_impacts: TradeImpactType[];
    combined_remaining_balance: {
      account: {
        id: string;
        number: string;
        name: string;
      };
      currency: CurrencyType;
      cash: number;
      buying_power: number | null;
    };
  };
}

export interface MultipleTradesOrderImpactResponseType extends ResponseType {
  data: TradeImpactType[];
}

export interface SecurityTypeResponseType extends ResponseType {
  data: {
    id: string;
    code: string;
    description: string;
    is_supported: boolean;
  }[];
}

export interface BrokerageResponseType extends ResponseType {
  data: BrokerageType[];
}

export interface BrokerageAuthsResponseType extends ResponseType {
  data: BrokerageAuthorizationType[];
}

export interface BrokerageAuthResponseType extends ResponseType {
  data: BrokerageAuthorizationType;
}

export interface DeleteAuthorizationResponseType extends ResponseType {
  data: '';
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
    id: string;
    symbol: {
      description: string;
      id: string;
      symbol: string;
      raw_symbol: string;
      currency: CurrencyType;
      exchange: {
        code: string;
        mic_code: string;
        name: string;
        suffix: string | null;
      } | null;
    };
    option_symbol: string | null;
    account: {
      id: string;
      number: string;
      name: string;
    };
    currency: CurrencyType;
    type: string;
    description: string;
    amount: number;
    price: number;
    units: number;
    fee: number;
    settlement_date: string;
    trade_date: string;
    institution: string;
    option_type: string;
  }[];
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
  }[];
}

export interface SymbolsQuoteResponseType extends ResponseType {
  data: {
    symbol: UniversalSymbolType;
    bid_price: number;
    ask_price: number;
    last_trade_price: number;
    bid_size: number;
    ask_size: number;
  }[];
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
  }[];
}

export interface PartnerDataResponseType extends ResponseType {
  data: {
    redirect_uri: string;
    can_access_trades: boolean;
    allowed_brokerages: BrokerageType[];
    name: string;
    slug: string;
    logo_url: string;
    pin_required: boolean;
    can_access_holdings: boolean;
    can_access_account_history: boolean;
    can_access_reference_data: boolean;
    can_access_portfolio_management: boolean;
    can_access_orders: boolean;
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
  }[];
}

export interface UniversalSymbolResponseType extends ResponseType {
  data: UniversalSymbolType[];
}

export interface PortfolioGroupResponseType extends ResponseType {
  data: PortfolioGroupType[];
}

export interface PortfolioGroupPositionsResponseType extends ResponseType {
  data: PortfolioGroupPositionType[];
}
