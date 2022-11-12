import { useFetch } from '../../hooks';
import { AccountData, DashboardState } from './types'
import { useEffect, useState } from 'react';
import Investors from '../data/Investors'
import Account from '../data/Account'
import { extensions, base } from './constants';
import  axios  from 'axios';



const Dashboard: React.FC = () => {

  const [ state, setState ] = useState<AccountData>({
    investors: [],
    holdings:[],
    rates: []
  });

  const callAPi = async ( url: string ) => {
    try {
      const { data } = await axios.get(`${base}/${url}.json`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    Promise.all(extensions.map( extension =>  callAPi(extension)))
    .then((results) => {
      const myState: DashboardState = extensions.reduce((acc: any, el, index: number) => {
        acc[el] = results[index];
        return acc
      },{});
      setState(myState)
    })
    .catch(err => {
      console.error(err)
    });
  },[]);

  return (
    <>
      <Investors {...state}/>
      <Account {...state}/>
    </>
  )
}

export default Dashboard;