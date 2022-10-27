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
            <StockTable data={trendingStocks} type='trending' title='Trending Stocks' />
        </Box>
    )
}

export default StocksList