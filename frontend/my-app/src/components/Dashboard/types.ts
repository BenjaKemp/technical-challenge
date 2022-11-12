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

  export interface Rate {
    id: number,
    investmentAccount: string, 
    annualRate: number
  }

  export interface AccountData {
    investors: Investor[]
    rates: Rate[]
    holdings: Holding[]
  }

  export interface DashboardState {
    investors: Investor[]
    rates: Rate[]
    holdings: Holding[]
  }