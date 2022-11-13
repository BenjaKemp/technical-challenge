import ReactSlider from 'react-slider'
import { useState } from 'react'
// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values

export const CustomSlider = ({setFilter, col, max, step, label}: any) => {
    const [riskRange, setRiskRange] = useState([0, max]);

    return (
      <div className="Slider">
        <label className="Slider__label" id="slider-label" htmlFor='name'>{label}</label>
        <ReactSlider
            min={0}
            max={max}
            value={riskRange}
            step={step}
            onChange={(value:any) => {
              setRiskRange(value)
              setFilter(col,value)
            }}
            className="Slider__horizontal"
            thumbClassName="horizontal-thumb"
            trackClassName="horizontal-track"
            renderThumb={(props:any, state:any) => <div {...props}>{state.valueNow}</div>}
            />
    </div>
    )
  }
  