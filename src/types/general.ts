export interface RequestOptionsType {
  timeout?: number;
}
export interface CurrencyType {
  id: string;
  code: string;
  name: string;
}
export interface AccountType {
  id: string;
  brokerage_authorization: string;
  portfolio_group: string;
  name: string;
  number: string;
  institution_name: string;
  cash_restrictions: CashRestrictionType[];
  created_date: string;
}

export interface BalanceType {
  currency: CurrencyType;
  cash: number;
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
  symbol: SymbolType;
}

export interface UniversalSymbolType {
  id: string;
  symbol: string;
  description: string;
  currency: CurrencyType;
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
  time_in_force: "FOK" | "Day";
  symbol: ManualTradeSymbolType;
  action: string;
  units: number;
  price: number;
}

export interface CashRestrictionType {
  id: string;
  account: string;
  currency: string;
  type: "ALLOCATE_MAX" | "RETAIN_MIN";
  amount: number;
}

export interface BrokerageType {
  id: string;
  name: string;
  display_name: string;
  url: string;
  open_url: string;
  description: string;
  slug: string;
  aws_s3_logo_url: string;
  aws_s3_square_logo_url: string;
  maintenance_mode: boolean;
  is_real_time_connection: boolean;
  authorized_types: {
    type: string;
  }[];
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

export interface InvestmentAccountType {
  id: string;
  brokerage_authorization: string;
  portfolio_group: string;
  name: string;
  number: string;
  institution_name: string;
  created_date: string;
  cash_restrictions: CashRestrictionType[];
}

export interface OrderType {
  brokerage_order_id: string;
  status: string;
  symbol: string;
  universal_symbol: UniversalSymbolType;
  action: string;
  total_quantity: number;
  open_quantity: number;
  canceled_quantity: number;
  filled_quantity: number;
  execution_price: number;
  limit_price: number;
  stop_price: number;
  order_type: string;
  time_in_force: "FOK" | "Day";
  time_placed: string;
  time_updated: string;
  expiry_date: string;
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
