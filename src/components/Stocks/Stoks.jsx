import { useContext } from "react"
import StockTable from "./StocksComponents/StockTable"
import { DataContext } from "../../context/data.context"

function StocksList() {
    const { trendingStocks } = useContext(DataContext)

    return (
        <>
            <StockTable data={trendingStocks} type='trending' title='Trending Stocks' />
        </>
    )
}

export default StocksList