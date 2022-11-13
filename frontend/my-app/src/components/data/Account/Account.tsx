import { AccountData } from '../../Dashboard/types';
import { useEffect, useState, useMemo } from 'react'
import { useTable, useFilters, useSortBy, Column } from 'react-table'

interface AccountProps extends AccountData {
  accountProps: any
}

const Account: React.FC<AccountProps> = ({ investors, holdings, rates, accountProps }): JSX.Element => {

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
  const data = useMemo(
    () => [
      ...Object.keys(accountProps).map((account) => ({
          col0: account,
          col1: accountProps[account]['total'],
          col2: (accountProps[account]['total'] * (1 - (accountProps[account]['annualRate'] / 100))).toFixed(2),
      }))
    ], [accountProps])

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