import { AccountData, Investor, Holding } from '../../Dashboard/types';

export interface InvestorHolidings extends Investor {
    holdings: Record<string, string> 
}
export type InvestorsState = { [key: string]: InvestorHolidings }


