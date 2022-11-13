export const FilterInvestorCallBack = (rows:any, columnIds:any, filterValue:any) => {
    return rows.filter((row: any) => (filterValue[0] < row.values[columnIds]) && (filterValue[1] > row.values[columnIds]))
}