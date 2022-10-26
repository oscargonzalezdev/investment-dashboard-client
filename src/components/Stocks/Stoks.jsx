import { useContext } from "react"
import {
    Box,
    Alert,
    Heading,
} from "@chakra-ui/react"
import {
    MdOutlinePlaylistAdd
} from 'react-icons/all'
import StockTable from "./StocksComponents/StockTable"
import { DataContext } from "../../context/data.context"

function StocksList() {

    const { trendingStocks, watchlist } = useContext(DataContext)

    return (
        <Box className='main-container'>
            {
                <Box className="flex-row" width='100%' h='100%' display='flex' justifyContent='space-evenly' gap='30px'>
                    <StockTable data={trendingStocks} type='trending' title='Trending Stocks' />
                    {
                        watchlist.length < 1
                            ? <Box className='box'>
                                <Heading textAlign='left' marginBottom='20px' >Watchlist</Heading>
                                <Alert status='warning' borderRadius={8} display='flex' flexDirection='column' padding='30px' gap='10px' fontWeight='500'>
                                    <MdOutlinePlaylistAdd fontSize='40px' />
                                    Your Watchlist is empty.<br /> Please, add the stocks you want to track.
                                </Alert>
                            </Box>
                            : <StockTable data={watchlist} type='watchlist' title='Watchlist' />
                    }
                </Box>
            }
        </Box>
    )
}

export default StocksList