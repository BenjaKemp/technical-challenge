import { AccountData, Investor, Holding } from '../../Dashboard/types';

export interface InvestorHoldings extends Investor {
    holdings: Record<string, string> 
}
export type InvestorsState = { [key: string]: InvestorHoldings }


