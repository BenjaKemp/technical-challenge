import ReactSlider from 'react-slider'
import { useState, useMemo } from 'react'
// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values

export const FilterInvestorRisk = ({setFilter, rows}: any) => {
    const [riskRange, setRiskRange] = useState([0, 1]);
    useMemo(()=>{
       rows.filter((row: any) => {
            return riskRange[0] < row.values.risk && riskRange[1] > row.values.risk
        })
    },[riskRange, rows])

    return (
      <>
        <ReactSlider
            min={0}
            max={1}
            value={riskRange}
            step={0.1}
            onChange={(value:any, index:any) => {
                setRiskRange(value)
                setFilter("riskLevel",value)
                console.log('setFilter    ',setFilter)
            }}
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            renderThumb={(props:any, state:any) => <div {...props}>{state.valueNow}</div>}
        />;
      </>
    )
  }
