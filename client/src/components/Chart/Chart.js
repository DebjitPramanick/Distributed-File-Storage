import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Chart = () => {

    const options = {
        title: {
            text: 'My chart'
        },
        series: [{
            data: [1, 2, 3]
        }]
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
