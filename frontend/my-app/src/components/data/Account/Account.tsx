import { AccountReceivedProps } from '../../Dashboard/types';
import { useMemo } from 'react'
import { useTable, useFilters, useSortBy } from 'react-table'


interface AccountsData {
  bankOfEnglandInterest: number;
  accountProps: AccountReceivedProps
}

const Account: React.FC<AccountsData> = ({ accountProps, bankOfEnglandInterest}): JSX.Element => {


  console.log('accountProps====>   ',accountProps)
  const columns = useMemo(
    () => [
      {
        Header: 'Account',
        accessor: 'col0',
      },
      {
        Header: 'Account Total',
        accessor: 'col1',
      },
      {
        Header: 'Account Interest Due',
        accessor: 'col2'
      }
    ], []
  )

  const keys = Object.keys(accountProps) as (keyof AccountReceivedProps)[];

 
  const data = useMemo(
    () => [
      ...keys.map((account) => {
        return {
          col0: account,
          col1: `£ ${accountProps[account]['total'].toFixed(2)}`,
          col2: `£ ${(accountProps[account]['total'] * ((accountProps[account]['annualRate'] + bankOfEnglandInterest) / 100)).toFixed(2)}`,
        }
      })
    ], [accountProps, bankOfEnglandInterest])

  const initialState = {};

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // @ts-ignore
  } = useTable({ columns, data, initialState }, useFilters, useSortBy)

  return (
    <div className='Account'>
        <div className="Account__table">
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

export default Account;