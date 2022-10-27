import { Box, Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import Plot from 'react-plotly.js';
import { DataContext } from '../../context/data.context';

function Balance() {
    const {wallet, balance } = useContext(DataContext)

    return (
        <Box className='box' w='40%' h='260px'>
        <Heading marginBottom='5px' textAlign='left' >Balance</Heading>
            <Plot
                data={[
                    {
                        type: "indicator",
                        mode: "number+delta",
                        value: balance,
                        number: { prefix: "€", font: {size: 42} },
                        delta: { font: {size: 20} ,position: "button", reference: wallet.deposit},
                        domain: { x: [0, 1], y: [0, 1] }
                    }
                ]}
                layout={{
                    width: 150,
                    height: 130,
                    margin: { t: 0, b: 0, l: 0, r: 0 },
                    modebar: { remove: 'toimage' }
                }}
                config={{ displaylogo: false, scrollZoom: false, responsive: true }}
                style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
            />
        </Box>
    )
}

export default Balance