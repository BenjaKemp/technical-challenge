import { AccountData, DashboardState, InvestorsProps, Investor, Rate, InvestorWithHoldings, AccountReceivedProps, Holding } from './types'
import { useEffect, useState } from 'react';
import Investors from '../data/Investors'
import Account from '../data/Account'
import { extensions, base } from './constants';
import axios from 'axios';
import { difference } from 'lodash'

const Dashboard: React.FC = () => {

  const [state, setState] = useState<AccountData>({
    investors: [],
    holdings: [],
    rates: []
  });
  const [investorsProps, setInvestors] = useState<InvestorsProps>({})
  const [accountProps, setAccounts] = useState<AccountReceivedProps>({} as AccountReceivedProps)
  const [bankOfEnglandInterest, setBankOfEnglandInterest] = useState<number>(2.25)

  const callAPi = async (url: string) => {
    try {
      const { data } = await axios.get(`${base}/${url}.json`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    Promise.all(extensions.map(extension => callAPi(extension)))
      .then((results) => {
        const myState: DashboardState = extensions.reduce((acc: any, el, index: number) => {
          acc[el] = results[index];
          return acc
        }, {});
        setState(myState)
      })
      .catch(err => {
        console.error(err)
      });
  }, []);

  // creating new data
  useEffect(() => {
    
    const { investors, holdings, rates } = state;
    let holdingsClone = [...holdings]

    let accountProps: AccountReceivedProps = {} as AccountReceivedProps;
    const investorsWithAccounts: InvestorsProps = investors.reduce((acc: InvestorsProps, investor: Investor) => {

      const investorHoldings = holdings.filter(holding => holding.investorId === investor.id)
      holdingsClone = difference(holdingsClone, investorHoldings)

      const investorHoldingsBalance: Record<string, number> = {}
      rates.forEach(({ investmentAccount, annualRate }: Rate) => {
        const { balance } = investorHoldings.find((holding: Holding) => holding.investmentAccount === investmentAccount) || {}
        const total = typeof balance === 'string' ? +balance : 0
        if (!accountProps[investmentAccount]) {
          accountProps[investmentAccount] = { annualRate, total };
        }
        accountProps[investmentAccount]['total'] += total;
        investorHoldingsBalance[investmentAccount] = total
      })

      acc[investor.name] = {
        ...investor,
        holdings: investorHoldingsBalance
      } as InvestorWithHoldings;
      return acc;
    }, {});

    setAccounts(accountProps)
    setInvestors(investorsWithAccounts)
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    if (parseInt(e.target.value) < parseInt(e.target.min)) {
      setBankOfEnglandInterest(+e.target.min)
    }
    else if (parseInt(e.target.value) > parseInt(e.target.max)) {
      setBankOfEnglandInterest(+e.target.max)
    } else {
      setBankOfEnglandInterest(+e.target.value)
    }

  }

  return (
    <div className='Dashboard'>
      <Investors investorsProps={investorsProps} rates={state.rates} />
      <Account accountProps={accountProps} bankOfEnglandInterest={bankOfEnglandInterest}/>
      <div className="Dashboard__BOE">
        <h3 className="Dashboard__BOE-header">Investment Total</h3>
        <label htmlFor="BOE rate">BoE Rate (%)</label>
        <input
          type="number"
          name="BOE rate"
          className="Dashboard__BOE-input"
          step=".01"
          onChange={handleChange}
          min='0'
          max='10'
          value={bankOfEnglandInterest}
        />
      </div>
      <p>Total Annual Interest Due</p>
    </div>
  )
}

export default Dashboard;