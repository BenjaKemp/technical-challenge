export interface Holding {
  balance: string
  id: number
  investmentAccount: string
  investorId: number
  }

  export interface Investor {
    name: string
    id: number
    riskLevel: number
  }
  type AccountTypes = 'TB1' | 'GBB' | 'MS1' |'28D' |'RS1'

  export type Rate = {
    id: number,
    investmentAccount: AccountTypes, 
    annualRate: number
  }

  export interface AccountData {
    investors: Investor[]
    rates: Rate[]
    holdings: Holding[]
  }


  type AccountDetails = {
    total: number,
    annualRate: number
  }

  export type AccountProps = {
    [key in AccountTypes]: AccountDetails

 }
  export interface DashboardState {
    investors: Investor[]
    rates: Rate[]
    holdings: Holding[]
  }

export interface InvestorHoldings extends Investor {
    holdings: Record<string, number> 
}
export type InvestorsProps = { [key: string]: InvestorHoldings }



