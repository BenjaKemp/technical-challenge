
import {  useMemo } from 'react'
import { Rate } from '../../Dashboard/types';
import { useTable, useFilters, useSortBy } from 'react-table'
import { CustomSlider } from '../../../ReactTables/Filters/CustomSlider'
import { FilterInvestorCallBack } from '../../../ReactTables/Filters/FilterInvestorCallback'

interface InvestorsData {
    rates: Rate[];
    investorsProps: Record<string, any>
}

const Investors: React.FC<InvestorsData> = ({ investorsProps, rates }): JSX.Element => {

    const columns = useMemo(
        () => [
            {
                Header: 'Investor',
                accessor: 'col0',
                canSort: true,
            },
            ...rates.map(({ investmentAccount, annualRate }, index) => ({
                Header: `${investmentAccount} (${annualRate})`,
                accessor: `col${index + 1}`,
                disableSortBy: true,
                canSort: false
            })),
            {
                Header: 'Investor Total',
                accessor: `col${rates.length + 1}`,
                Filter: CustomSlider,
                filter: FilterInvestorCallBack,
                canSort: true,
            },
            {
                Header: 'Investor Annual Interest Due',
                accessor: `col${rates.length + 2}`,
                disableSortBy: true,
                canSort: false
            },
            {
                Header: 'Risk Level',
                accessor: `riskLevel`,
                defaultCanFilter: true,
                Filter: CustomSlider,
                filter: FilterInvestorCallBack,
            }
        ], [rates]
    )


    const data = useMemo(
        () => [
            ...Object.keys(investorsProps).map((investor) => {
                let cumulativeHoldingValue: number = 0
                let cumulativeInterestValue: number = 0

                return {
                    col0: investorsProps[investor]['name'],
                    ...rates.reduce((acc: any, { investmentAccount, annualRate }: Rate, index: number) => {
                        const holdingValue = investorsProps[investor]['holdings'][investmentAccount]
                        cumulativeHoldingValue += +holdingValue
                        cumulativeInterestValue += (+holdingValue * (1 - (annualRate / 100)))
                        acc[`col${index + 1}`] = (+holdingValue).toFixed(2);
                        return acc
                    }, {}),
                    [`col${rates.length + 1}`]: cumulativeHoldingValue.toFixed(2),
                    [`col${rates.length + 2}`]: cumulativeInterestValue.toFixed(2),
                    riskLevel: investorsProps[investor]['riskLevel']
                }
            }
            )
        ],
        [investorsProps, rates]
    )
    const initialState = { hiddenColumns: ['riskLevel'] };

    const {
        getTableProps,
        getTableBodyProps,
        getGroupByToggleProps,
        headerGroups,
        rows,
        prepareRow,
        // @ts-ignore
        setFilter,

    } = useTable({ columns, data, initialState }, useFilters, useSortBy)


    return (
        <div className='Investor'>
            <div className="Investor__filters">
                <CustomSlider
                    label={'Risk Level'}
                    setFilter={setFilter}
                    col={`riskLevel`}
                    max={1}
                    step={0.1}
                />
                <CustomSlider
                    label={'Investor Total'}
                    setFilter={setFilter}
                    col={`col${rates.length + 1}`}
                    step={100}
                    max={2500}
                />
            </div>
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
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.render("Header")}
                                                {column.canSort &&
                                                    <span>
                                                        {column.isSorted
                                                            ? column.isSortedDesc
                                                                ? <i className="fa-solid fa-sort-down"></i>
                                                                : <i className="fa-solid fa-sort-up"></i>
                                                            : <i className="fa-solid fa-sort"></i>}
                                                    </span>
                                                }

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