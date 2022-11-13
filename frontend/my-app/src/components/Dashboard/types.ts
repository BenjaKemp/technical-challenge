export interface Holding {
  balance: string;
  id: number;
  investmentAccount: string;
  investorId: number;
}

export interface Investor {
  name: string;
  id: number;
  riskLevel: number;
}

export type Rate = {
  id: number;
  investmentAccount: AccountTypes;
  annualRate: number;
};

export interface AccountData {
  investors: Investor[];
  rates: Rate[];
  holdings: Holding[];
}
export type AccountTypes = "TB1" | "GBB" | "MS1" | "28D" | "RS1";

type AccountDetails = {
  total: number;
  annualRate: number;
};

export type AccountReceivedProps = Record<AccountTypes, AccountDetails>
export interface DashboardState {
  investors: Investor[];
  rates: Rate[];
  holdings: Holding[];
}
export interface InvestorWithHoldings extends Investor {
  holdings: {
    [key in AccountTypes]: number;
  };
}
export type InvestorsProps = {
  [key: string]: InvestorWithHoldings;
};
