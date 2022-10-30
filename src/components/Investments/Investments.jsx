import { Box, Alert, Heading, AlertIcon } from "@chakra-ui/react"
import { useContext } from "react"
import { DataContext } from "../../context/data.context"
import StockTable from '../Stocks/StocksComponents/StockTable'

function Investments() {
    const { investments } = useContext(DataContext)
    return (
        <>
            {
                investments.length < 1
                    ? <Box className='box'>
                        <Heading className='section-title'>Last Trades</Heading>
                        <Alert status='warning' borderRadius={8} display='flex' flexDirection='column' padding='30px' gap='10px' fontWeight='500'>
                            <AlertIcon fontSize='40px' />
                            Your Trade list is empty.<br />
                        </Alert>
                    </Box>
                    : <StockTable data={investments} type='investments' title='Last Trades' />
            }
        </>
    )
}

export default Investments