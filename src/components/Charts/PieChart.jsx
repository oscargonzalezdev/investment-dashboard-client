import { Box, Heading, Alert, AlertIcon, background } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { DataContext } from '../../context/data.context';

function PieChart() {
    const { investments } = useContext(DataContext)

    useEffect(() => {
        getChartValues()
    }, [investments])

    const getChartValues = () => {
        const values = []
        const labels = []
        if (investments.length > 0){
            investments.forEach(stock => {
                if (stock.Type === 'buy') {
                    values.push(stock.Amount)
                    labels.push(stock.Symbol)
                } 
            })
        } 
        return { values: values, labels: labels }
    }

    return (
        <>
            {
                !investments.length > 0
                ? <Box className='box' w='60%' h='260px'>
                        <Heading textAlign='left' marginBottom='20px' >Investments</Heading>
                        <Alert status='warning' borderRadius={8} display='flex' flexDirection='column' padding='30px' gap='10px' fontWeight='500'>
                            <AlertIcon fontSize='40px' />
                            Investments not found.<br />
                        </Alert>
                    </Box>
                : <Box className='box' w='100%' h='260px'>
                    <Heading textAlign='left' >Investments</Heading>
                    <Plot
                        data={[
                            {
                                type: "pie",
                                values: getChartValues().values,
                                labels: getChartValues().labels,
                                textinfo: "label+percent",
                                textposition: "outside",
                                automargin: true
                            }
                        ]}
                        layout={{
                            width: 150,
                            height: 150,
                            margin: { "t": 20, "b": 0, "l": 0, "r": 0 },
                            showlegend: false,
                            modebar: { remove: 'toimage' }
                        }}
                        config={{ displaylogo: false, scrollZoom: true, responsive: true }}
                        style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
                    />
                </Box>
            }
        </>
    )
}

export default PieChart