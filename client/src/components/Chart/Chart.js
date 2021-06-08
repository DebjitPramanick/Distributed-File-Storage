import React, {useState} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import "../../styles/components.css"

const Chart = () => {

    const [chart, setChart] = useState('line')

    const options = {
        title: {
            text: 'Stat'
        },
        chart: {
            // height: 260,
            // width: 460,
            type: chart,
            // margin: [20, 0, 20, 20]
        },
        series: [{
            data: [11, 32, 43, 80, 59, 17, 65]
        }],
        xAxis: {
            categories: ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"],
            lineColor: '#979797',
            lineWidth: 0.8
        },
    }


    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />

        </div>
    )
}

export default Chart
