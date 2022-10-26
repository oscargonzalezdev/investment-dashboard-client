import { Box, Button, useDisclosure, Image } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { stocksArr } from "../../../utils/seeds/stocksArr"
import StockChart from "../../Charts/StockChart"
import { useContext } from 'react'
import { DataContext } from '../../../context/data.context'
import { useParams } from "react-router-dom"
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Text,
    Heading,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton
} from '@chakra-ui/react'
import {
    BsFillArrowDownRightCircleFill as StockDown,
    BsFillArrowUpRightCircleFill as StockUp,
    MdOutlinePlaylistAdd,
    MdOutlineDeleteSweep
} from 'react-icons/all'

function StockDetails({ symbol2, title, w }) {
    let { symbol } = useParams()
    if (!symbol) {
        symbol = symbol2
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const { watchlist, setWatchlist, balance, setBalance, investments, setInvestments, sells, setSells } = useContext(DataContext)
    const [chartData, setChartData] = useState({})
    const [stockInfo, setStockInfo] = useState({})
    const [stocksToBuy, setStocksToBuy] = useState(0)
    const [stocksToSell, setStocksToSell] = useState(0)
    const [selectedOption, setSelectedOption] = useState('')
    const [amount, setAmount] = useState(0)
    const apiKey = 'TA4JH3O6GF8X4SLJ'
    const baseUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${symbol === 'IBM' ? 'demo' : apiKey}`

    useEffect(() => {
        const fetchStockValues = async () => {
            const response = await axios.get(baseUrl)
            if (response.status === 200) {
                const stockPrices = await response.data['Time Series (Daily)']
                formatData(stockPrices)
            }
        }
        fetchStockValues()
        getStockInfo(symbol)
    }, [symbol])

    useEffect(() => {
        setStocksToSell(getBoughtStocks())
    }, [investments])

    const handleAddToWatchlist = (stock) => {
        setWatchlist([...watchlist, stock])
    }

    const handleDeleteFromWatchList = (stock) => {
        const filteredArr = [...watchlist].filter(item => {
            return item.Symbol !== stock.Symbol
        })
        setWatchlist(filteredArr)
    }

    const hasStock = (symbol) => {
        return watchlist.some(stock => {
            return stock.Symbol === symbol
        })
    }

    const getStockInfo = (symbol) => {
        const selectedStock = stocksArr.find(stock => { return stock.Symbol === symbol })
        setStockInfo(selectedStock)
    }

    const formatData = (stockPrices) => {
        const chartXValues = []
        const chartYValues = []
        for (const key in stockPrices) {
            chartXValues.push(key)
            chartYValues.push(stockPrices[key]['1. open'])
        }
        setChartData({ x: chartXValues, y: chartYValues })
    }

    const handleChange = (value) => {
        setStocksToBuy(Number(value).toFixed(0))
        let currentAmount = (value * chartData.y[0]) * 100 / 100
        setAmount(currentAmount.toFixed(2))
    }

    const openBuy = () => {
        setSelectedOption('buy')
        onOpen()
    }

    const openSell = () => {
        setSelectedOption('sell')
        onOpen()
    }

    const handleAction = (type) => {
        const boughtStock = {
            'Type': type,
            'Amount': (Number(chartData.y[0]).toFixed(2) * Number(stocksToBuy)),
            'Quantity': Number(stocksToBuy),
            'Price': Number(chartData.y[0]).toFixed(2),
            'CompanyName': stockInfo.CompanyName,
            'LogoUrl': stockInfo.LogoUrl,
            'PriceChange': stockInfo.PriceChange,
            'Symbol': stockInfo.Symbol
        }
        setInvestments([...investments, boughtStock])
        onClose()
    }

    const getBoughtStocks = () => {
        const boughtStocks = [...investments].filter(stock => {
            return stock.Symbol === symbol && stock.Type === 'buy'
        })
        const soldStocks = [...investments].filter(stock => {
            return stock.Symbol === symbol && stock.Type === 'sell'
        })
        let totalBoughtStocks = 0
        if (boughtStocks) { totalBoughtStocks = boughtStocks.reduce(function (acc, investment) { return acc + Number(investment.Quantity) }, 0) }
        let totalSoldStocks = 0
        if (soldStocks) { totalSoldStocks = soldStocks.reduce(function (acc, investment) { return acc + Number(investment.Quantity) }, 0) }

        return Number(totalBoughtStocks - totalSoldStocks).toFixed(0)
    }

    return (
        <Box className={!w && 'main-container' }>
            {
                chartData.x
                    ? (
                        <Box>
                            <Box className='box' w={w ? w : '100%'}>
                                {
                                    title
                                        ? <Heading className='section-title'>{title}</Heading>
                                        : null
                                }
                                <Box display='flex' justifyContent='space-between' alignItems='center' textAlign='left'>
                                    <Box display='flex' alignItems='center' gap='10px'>
                                        <Box border='1px solid #ccc' h='60px' w='60px' borderRadius={8} display='flex' alignItems='center' m='auto'>
                                            <Image p='6px' w='100%' h='auto' src={stockInfo.LogoUrl} />
                                        </Box>
                                        <Box>
                                            <Box display='flex' justifyContent='center' alignItems='center'  >
                                                <Heading><strong>{stockInfo.CompanyName.length > 20 ? stockInfo.CompanyName.slice(0, 20) + '...' : stockInfo.CompanyName}</strong></Heading>
                                                <Button variant='ghost' onClick={hasStock(symbol) ? () => handleDeleteFromWatchList(stockInfo) : () => handleAddToWatchlist(stockInfo)}>
                                                    {hasStock(symbol) ? <MdOutlineDeleteSweep fontSize='1.3rem' /> : <MdOutlinePlaylistAdd fontSize='1.3rem' />}
                                                </Button>
                                            </Box>
                                            <h3>{symbol}</h3>
                                        </Box>
                                    </Box>
                                    <Box display='flex' flexDirection='column' gap='5px'>
                                        <Heading><strong>€ {Number(chartData.y[0]).toFixed(2)}</strong></Heading>
                                        <Heading as='h3' w='90px'
                                            gap='10px'
                                            display='flex'
                                            justifyContent='start'
                                            className={stockInfo.PriceChange.includes('-') ? 'stock-down' : 'stock-up'}
                                            fontWeight='600'
                                        >
                                            {stockInfo.PriceChange.includes('-') ? <StockDown /> : <StockUp />}{stockInfo.PriceChange}</Heading>
                                    </Box>
                                </Box>
                                <StockChart chartData={chartData} />
                                <Box display='flex' justifyContent='space-between' gap='30px'>
                                    <Button isDisabled={getBoughtStocks() < 1} w='50%' ref={btnRef} colorScheme='red' onClick={() => openSell()}>Sell</Button>
                                    <Button w='50%' ref={btnRef} colorScheme='green' onClick={() => openBuy()}>Buy</Button>
                                </Box>
                            </Box>
                            <Box display='flex' justifyContent='center' alignItems='center' gap='10px'>
                                <Drawer
                                    isOpen={isOpen}
                                    placement='right'
                                    onClose={onClose}
                                    finalFocusRef={btnRef}
                                >
                                    <DrawerOverlay background='#00000090' />
                                    <DrawerContent p='20px'>
                                        <DrawerCloseButton />
                                        <DrawerHeader className='capitalize'>{`${selectedOption} ${symbol} stocks`}</DrawerHeader>
                                        <DrawerBody display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='30px' overflow='hidden'>
                                            <Box w='100%' display='flex' flexDirection='column' gap='15px'>
                                                <Text fontWeight='500' textAlign='left'>Amount: </Text>
                                                <Slider
                                                    focusThumbOnChange={false}
                                                    value={Number(stocksToBuy).toFixed(0)}
                                                    max={
                                                        selectedOption === 'buy'
                                                            ? Math.floor(Number(balance) / Number(chartData.y[0]))
                                                            : Number(stocksToSell)
                                                    }
                                                    onChange={handleChange}
                                                    w='80%'
                                                    margin='20px auto 0 auto'
                                                >
                                                    <SliderTrack >
                                                        <SliderFilledTrack />
                                                    </SliderTrack>
                                                    <SliderThumb bgColor='#3F51B5' fontSize='1.1rem'><Box position='relative' top='-20px'>€{amount}</Box></SliderThumb>
                                                </Slider>
                                            </Box>
                                            <Box w='100%' display='flex' flexDirection='column' gap='15px'>
                                                <Text fontWeight='500' textAlign='left'>Stocks: </Text>
                                                <NumberInput
                                                    display='flex'
                                                    gap='10px'
                                                    max={selectedOption === 'buy' ? Math.floor(Number(balance) / Number(chartData.y[0])) : Number(stocksToSell)}
                                                    min={1} value={Number(stocksToBuy).toFixed(0)}
                                                    onChange={handleChange}
                                                >
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Box>
                                            <Button
                                                className="capitalize"
                                                isDisabled={
                                                    selectedOption === 'buy'
                                                        ? (Number(stocksToBuy) === 0 || Number(stocksToBuy).toFixed(0) > (Math.floor(Number(balance) / Number(chartData.y[0]))))
                                                        : (Number(stocksToBuy) === 0) || Number(stocksToBuy) > stocksToSell
                                                }
                                                w='100%'
                                                onClick={() => handleAction(selectedOption)}
                                                colorScheme='brand'
                                            >
                                                {selectedOption}
                                            </Button>
                                        </DrawerBody>
                                    </DrawerContent>
                                </Drawer>
                            </Box>
                        </Box>
                    )
                    : <span>Loading..</span>
            }
        </Box>
    )
}

export default StockDetails