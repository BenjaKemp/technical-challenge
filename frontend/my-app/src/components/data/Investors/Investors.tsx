
import { useEffect, useState, useMemo } from 'react'
import { InvestorHolidings, InvestorsState } from './types'
import { AccountData, Investor, Rate } from '../../Dashboard/types';
import { useTable, useFilters } from 'react-table'
import { FilterInvestorRisk }  from '../../../ReactTables/Filters/FilterInvestorRisk'
import { FilterInvestorCallBack }  from '../../../ReactTables/Filters/FilterInvestorCallback'


const Investors: React.FC<AccountData> = ({ rates, holdings, investors }: AccountData): JSX.Element => {

    const [investorsState, setInvestorsState] = useState<InvestorsState>({})

    useEffect(() => {
        const newState: InvestorsState = investors.reduce((acc: InvestorsState, el: Investor) => {

            const investorHoldings = holdings.filter(holding => holding.investorId === el.id)
            const investorHoldingsBalance: Record<string, string> = {}
            rates.forEach(({ investmentAccount }: Rate) => {
                const { balance } = investorHoldings.find(holding => holding.investmentAccount === investmentAccount) || {}
                investorHoldingsBalance[investmentAccount] = balance || '0'
            })

            acc[el.name] = {
                ...el,
                holdings: investorHoldingsBalance
            } as InvestorHolidings;
            return acc;
        }, {});

        setInvestorsState(newState)
    }, [holdings, investors]);


    const columns = useMemo(
        () => [
            {
                Header: 'Investor',
                accessor: 'col0',
            },
            ...rates.map(({ investmentAccount, annualRate }, index) => ({
                Header: `${investmentAccount} (${annualRate})`,
                accessor: `col${index + 1}`
            })),
            {
                Header: 'Investor Total',
                accessor: `col${rates.length + 1}`,
                // Filter: FilterInvestorTotal
            },
            {
                Header: 'Investor Annual Interest Due',
                accessor: `col${rates.length + 2}`
            },
            {
                Header: 'Risk Level',
                accessor: `riskLevel`,
                Filter: FilterInvestorRisk,
                filter: FilterInvestorCallBack,
            }
        ], [rates]
    )
    const data = useMemo(
        () => [
            ...Object.keys(investorsState).map((investor) => {
                let cumulativeHoldingValue = 0
                let cumulativeInterestValue = 0

                return {
                    col0: investorsState[investor]['name'],
                    ...rates.reduce((acc: any, { investmentAccount, annualRate }: Rate, index: number) => {
                        const holdingValue = investorsState[investor]['holdings'][investmentAccount]
                        cumulativeHoldingValue += Number(holdingValue)
                        cumulativeInterestValue += (Number(holdingValue) * (1 - (annualRate / 100)))
                        acc[`col${index + 1}`] = holdingValue;
                        return acc
                    }, {}),
                    [`col${rates.length + 1}`]: cumulativeHoldingValue,
                    [`col${rates.length + 2}`]: cumulativeInterestValue,
                    riskLevel: investorsState[investor]['riskLevel']
                }
            }
            )
        ],
        [investorsState, rates]
    )
    const initialState = { hiddenColumns: ['riskLevel'], manualFilters: true };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        // @ts-ignore
        setFilter,
    } = useTable({ columns, data, initialState },useFilters)


    console.log('setFilter    ',setFilter)

    return (
        <div className='Investor'>
            <FilterInvestorRisk
            setFilter={setFilter}
            rows={rows}
            />
            <div className="Investor__table">
                <table {...getTableProps()}>
                    <thead>
                        {// Loop over the header rows
                            headerGroups.map(headerGroup => (
                                // Apply the header row props
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {// Loop over the headers in each row
                                        headerGroup.headers.map(column => (
                                            // Apply the header cell props
                                            <th {...column.getHeaderProps()}>
                                                {// Render the header
                                                    column.render('Header')}
                                            </th>
                                        ))}
                                </tr>
                            ))}
                    </thead>
                    {/* Apply the table body props */}
                    <tbody {...getTableBodyProps()}>
                        {// Loop over the table rows
                            rows.map(row => {
                                // Prepare the row for display
                                prepareRow(row)
                                return (
                                    // Apply the row props
                                    <tr {...row.getRowProps()}>
                                        {// Loop over the rows cells
                                            row.cells.map(cell => {
                                                // Apply the cell props
                                                return (
                                                    <td {...cell.getCellProps()}>
                                                        {// Render the cell contents
                                                            cell.render('Cell')}
                                                    </td>
                                                )
                                            })}
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Investors