import { createContext, useEffect, useState } from 'react'
import { fetchNews } from '../utils/fetchNews'
import { stocksArr } from '../utils/seeds/stocksArr'

const DataContext = createContext()

function DataProviderWrapper(props) {
    const [trendingStocks, setTrendingStocks] = useState([])
    const [buttonSelected, setButtonSelected] = useState('all')
    const [news, setNews] = useState([])
    const [wallet, setWallet] = useState({ deposit: 0, investment: 0 })
    const [investments, setInvestments] = useState([])
    const [sells, setSells] = useState([])
    const [balance, setBalance] = useState(0)
    const [user, setUser] = useState({ userName: '' })
    const [watchlist, setWatchlist] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        if (user.userName !== '') {
            const getNews = async () => {
                const response = await fetchNews()
                setNews(response)
            }
            getNews()
            getTrendingStocks()
            setDefaultWatchlist()
        }
    }, [user])

    useEffect(() => {
        if (investments.length > 0) {
            const lastStock = investments[investments.length - 1]
            if (lastStock.Type === 'buy') {
                setBalance(balance - Number(lastStock.Amount))
            }
            if (lastStock.Type === 'sell') {
                setBalance(balance + Number(lastStock.Amount))
            }
        }
    }, [investments])

    useEffect(() => {
        if (sells) {
            const reducedSells = [...sells].reduce(function (acc, investment) { return acc + Number(investment.amount) }, 0)
            const currentBalance = Number(balance) + Number(reducedSells)
            setBalance(currentBalance.toFixed(2))
        }
    }, [sells])

    const getTrendingStocks = (type) => {
        const winners = stocksArr.filter(stock => {
            return !stock.PriceChange.includes("-")
        })

        const lossers = stocksArr.filter(stock => {
            return stock.PriceChange.includes("-") && stock.PriceChange !== "-"
        })

        const sortedWinners = winners.sort((a, b) => b.PriceChange.localeCompare(a.PriceChange))
        const sorteLossers = lossers.sort((a, b) => b.PriceChange.localeCompare(a.PriceChange))
        const popular = [...sortedWinners.slice(0, 5), ...sorteLossers.slice(0, 5)].sort((a, b) => a.CompanyName.localeCompare(b.CompanyName))

        if (type === 'winners') {
            setTrendingStocks(sortedWinners.slice(0, 5))
            setButtonSelected('winners')
        } else if (type === 'lossers') {
            setTrendingStocks(sorteLossers.slice(0, 5))
            setButtonSelected('lossers')
        } else {
            setTrendingStocks(popular)
            setButtonSelected('all')
        }
    }

    const setDefaultWatchlist = () => {
        const selectedStocks = stocksArr.filter(stock => {
            return stock.Symbol === 'AAPL' || stock.Symbol === 'TSLA' || stock.Symbol === 'MSFT'
        })
        setWatchlist(selectedStocks)
    }

    return (
        <DataContext.Provider
            value={{
                trendingStocks,
                setTrendingStocks,
                watchlist,
                setWatchlist,
                getTrendingStocks,
                buttonSelected,
                news,
                setNews,
                wallet,
                setWallet,
                investments,
                setInvestments,
                balance,
                setBalance,
                user,
                setUser,
                sells,
                setSells,
                searchResults,
                setSearchResults,
                isSearching,
                setIsSearching,
            }}>
            {props.children}
        </DataContext.Provider>
    )
}

export { DataContext, DataProviderWrapper }