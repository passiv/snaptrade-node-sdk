export interface RequestOptionsType {
  timeout?: number;
}
export interface CurrencyType {
  id: string;
  code: string;
  name: string;
}

export interface BrokerageAuthorizationType {
  id: string;
  created_date: string;
  updated_date: string;
  name: string;
  type: string;
  disabled: boolean;
  disabled_date: string | null;
  meta: { identifier: string };
  brokerage: {
    id: string;
    name: string;
    display_name: string;
    description: string;
    aws_s3_logo_url: string;
    aws_s3_square_logo_url: string;
    slug: string;
    url: string;
    enabled: boolean;
    maintenance_mode: boolean;
    allows_fractional_units: boolean;
    allows_trading: boolean;
    has_reporting: boolean;
    is_real_time_connection: boolean;
    allows_trading_through_snaptrade_api: boolean;
    is_scraping_integration: boolean;
    transaction_available_in_realtime: boolean;
    has_timestamped_transactions: boolean;
    are_fees_shown_in_transactions: boolean;
    open_url: string;
    credentials_stored_in_vault: boolean;
    has_option_position_support: boolean;
    has_option_trading_support: boolean;
    allows_cryptocurrency_symbols: boolean;
    allows_cryptocurrency_and_regular_securities: boolean;
    handles_stock_splits: boolean;
    default_currency: string;
    brokerage_type: string;
    exchanges: string[];
  };
}

// UserHoldingsResponseType
export interface AccountType {
  brokerage_authorization: BrokerageAuthorizationType;
  id: string;
  number: string;
  name: string;
}

export interface _AccountType {
  id: string;
  brokerage_authorization: string;
  portfolio_group: string;
  name: string;
  number: string;
  institution_name: string;
  meta: {
    type: string;
    status: string;
    institution_name: string;
    is_billing: boolean;
    is_primary: boolean;
    client_account_type: string;
  };
  cash_restrictions: [];
  created_date: string;
}

export interface BalanceType {
  cash: number;
  currency: CurrencyType;
  buying_power: string;
}

export interface SymbolType {
  symbol: string;
  name: string;
  description: string;
  currency: CurrencyType;
  exchange: {
    code: string;
    name: string;
  };
}

export interface PositionType {
  symbol: {
    symbol: {
      id: string;
      symbol: string;
      description: string;
      currency: DividendsSymbolCurrency;
      exchange: DividendsSymbolExchange;
      currencies: DividendsSymbolCurrency[];
      type: {
        id: string;
        code: string;
        is_supported: boolean;
        description: string;
      };
      raw_symbol: string;
    };
    id: string;
    description: string;
    local_id: string;
    security_type: {};
    listing_exchange: {};
    is_quotable: boolean;
    is_tradable: boolean;
  };
  price: number;
  open_pnl: null | number;
  fractional_units: number;
  currency: null | string;
  units: number;
  average_purchase_price: number;
}

export interface UniversalSymbolType {
  id: string;
  symbol: string;
  description: string;
  currency: {
    id: string;
    code: string;
    name: string;
    include_in_rate_data: boolean;
  };
  exchange: DividendsSymbolExchange;
  currencies: [];
  type: {
    id: string;
    code: string;
    is_supported: boolean;
    description: string;
  };
  raw_symbol: string;
}

export interface ManualTradeSymbolType {
  brokerage_symbol_id: string;
  universal_symbol_id: string;
  currency: CurrencyType;
  local_id: string;
  description: string;
  symbol: string;
}

export interface TradeType {
  id: string;
  account: AccountType;
  order_type: string;
  time_in_force: 'FOK' | 'Day';
  symbol: ManualTradeSymbolType;
  action: string;
  units: number;
  price: number;
}

export interface TradeImpactType {
  account: string;
  currency: string;
  remaining_cash: number;
  estimated_commissions: number;
  forex_fees: number;
}

export interface CashRestrictionType {
  id: string;
  account: string;
  currency: string;
  type: 'ALLOCATE_MAX' | 'RETAIN_MIN';
  amount: number;
}

export interface BrokerageType {
  authorization_types: {
    type: 'read' | 'trade';
    auth_type: string;
  }[];
  maintenance_windows: [];
  brokerage_type: {
    id: string;
    name: string;
  };
  id: string;
  name: string;
  description: string;
  slug: string;
  url: string;
  maintenance_mode: boolean;
  allows_fractional_units: boolean | null;
  allows_trading: boolean;
  has_reporting: boolean;
  is_real_time_connection: boolean;
  aws_s3_logo_url: string;
  aws_s3_square_logo_url: string;
  open_url: string;
  display_name: string;
  enabled: boolean;
  has_option_position_support: boolean;
  has_option_trading_support: boolean;
  allows_cryptocurrency_symbols: boolean;
  allows_cryptocurrency_and_regular_securities: boolean;
  confirm_prompt: string | null;
  default_connection_type: string;
}

export interface PortfolioGroupType {
  id: string;
  name: string;
}

export interface PortfolioGroupPositionType {
  symbol: SymbolType;
  price: number;
  units: number;
  fractional_units: number;
}

export interface OrderType {
  brokerage_order_id: string;
  status: string;
  symbol: string;
  universal_symbol: UniversalSymbolType;
  action: string;
  total_quantity: string;
  open_quantity: string;
  canceled_quantity: string;
  filled_quantity: string;
  execution_price: string;
  limit_price: number | null;
  stop_price: number | null;
  order_type: string;
  time_in_force: 'FOK' | 'Day';
  time_placed: string;
  time_updated: string;
  expiry_date: string | null;
}

export interface OptionPosition {
  symbol: {
    id: string;
    description: string;
    option_symbol: string;
    local_id: string;
    security_type: {};
    listing_exchange: {};
    is_quotable: boolean;
    is_tradable: boolean;
  };
  price: number;
  currency: CurrencyType;
}

export interface Timeframe {
  date: string;
  value: number;
  currency: string;
}

export interface Contribution {
  contributions: number;
  date: string;
  currency: string;
}

export interface ReturnRateTimeframe {
  periodStart: string;
  periodEnd: string;
  rateOfReturn: number;
}

export interface DividendsSymbolCurrency {
  id: string;
  code: string;
  name: string;
  include_in_rate_data: boolean;
}

export interface DividendsSymbolExchange {
  id: string;
  mic_code: string;
  code: string;
  name: string;
  timezone: string;
  start_time: string;
  close_time: string;
  suffix: null;
  allows_cryptocurrency_symbols: boolean;
}

export interface DividendsSymbolType {
  id: string;
  code: string;
  is_supported: boolean;
  description: string;
}

export interface DividendsSymbol {
  id: string;
  symbol: string;
  description: string;
  currency: DividendsSymbolCurrency;
  exchange: DividendsSymbolExchange;
  currencies: any[];
  type: DividendsSymbolType;
  raw_symbol: string;
}

export interface Dividends {
  symbol: DividendsSymbol;
  amount: number;
  currency: string;
}

export interface DividendsTimelineInfo {
  symbol: string;
  amount: number;
  currency: string;
}

export interface DividendsTimeline {
  date: string;
  dividends: DividendsTimelineInfo[];
}
