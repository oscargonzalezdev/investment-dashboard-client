import { Box } from '@chakra-ui/react';
import Plot from 'react-plotly.js';
import SkewLoader from "react-spinners/SkewLoader"

function StockChart({ chartData }) {
    return (
        <>
            {
                !chartData
                    ? <SkewLoader
                        color="#3F51B5"
                        cssOverride={{ margin: 'auto' }}
                        loading
                        size={30}
                        speedMultiplier={1}
                    />
                    : <Plot
                        data={[
                            {
                                x: chartData.x,
                                y: chartData.y,
                                type: 'scatter',
                                fill: 'tozeroy',
                                mode: 'lines+markers',
                                marker: { color: '#3F51B5' }
                            }
                        ]}
                        layout={{
                            height: 200,
                            autosize: true,
                            margin: { b: 20, t: 0, l: 30, r: 0 },
                            modebar: { orientation: 'v', remove: ['lasso', 'toimage', 'select', 'autoscale'] }
                        }}
                        config={{ displaylogo: false, scrollZoom: true, responsive: true }}
                    />
            }
        </>
    )
}

export default StockChart