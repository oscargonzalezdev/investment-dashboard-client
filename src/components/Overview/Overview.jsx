import { Box, Grid, GridItem, Button, ButtonGroup, Heading } from "@chakra-ui/react"
import { useContext } from "react"
import { DataContext } from "../../context/data.context"
import Balance from "../Charts/Balance"
import PieChart from "../Charts/PieChart"
import BreakingNews from "../News/BreakingNews"
import StockDetails from "../Stocks/StocksComponents/StockDetails"
import StockTable from "../Stocks/StocksComponents/StockTable"

function Overview() {
    const { trendingStocks } = useContext(DataContext)

    return (
        <>
            <Grid templateColumns='repeat(9, 1fr)' gap='20px'>
                <GridItem display='flex' flexDirection='column' gap='20px' colSpan={5}>
                    <StockDetails w='100%' title='Stock of the Week' symbol2={'IBM'} />
                    <StockTable w='100%' h='400px' data={trendingStocks} type='trending' title='Trending Stocks' />
                </GridItem>
                <GridItem display='flex' flexDirection='column' gap='20px' colSpan={4}>
                    <Box display='flex' gap='20px'>
                        <Balance />
                        <PieChart />
                    </Box>
                    <BreakingNews h='620px' />
                </GridItem>
            </Grid>
        </>
    )
}

export default Overview