import { useContext } from 'react'
import {
    Box,
    Heading,
    ButtonGroup,
    Button,
    TableContainer,
    Table,
    Tbody,
    Tr,
    Td,
    Image,
    Text
} from '@chakra-ui/react'
import {
    BsFillArrowDownRightCircleFill as StockDown,
    BsFillArrowUpRightCircleFill as StockUp,
    FaHeart,
    FaRegHeart,
} from 'react-icons/all'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../../context/data.context'

function StockTable({ data, type, title, w, h }) {

    const { getTrendingStocks, buttonSelected, watchlist, setWatchlist, setSearchResults, setIsSearching } = useContext(DataContext)
    const navigate = useNavigate()

    const handleViewDetails = (symbol) => {
        navigate(`/stocks/${symbol}`)
        resetSearch()
    }

    const resetSearch = () => {
        const searchBar = document.querySelector('#searchBar')
        searchBar.value = ''
        setSearchResults([])
        setIsSearching(false)
    }

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

    return (
        <>
            {
                data &&
                <Box className='box'>
                    <Box display='flex' justifyContent='space-between' marginBottom='20px'>
                        <Box w='100%' display='flex' justifyContent='space-between' alignItems='center'>
                            <Heading textAlign='left' >{title}</Heading>
                            <Text>{type === 'results' ? data.length : null}</Text>
                        </Box>
                        {
                            type === 'trending'
                                ? <ButtonGroup variant='outline' size='sm' display='flex' justifyContent='flex-end'>
                                    <Button onClick={() => getTrendingStocks()} color={buttonSelected !== 'all' ? 'blackAlpha.600' : '#000'} bgColor={buttonSelected === 'all' ? 'gray.100' : null}>All</Button>
                                    <Button onClick={() => getTrendingStocks('winners')} color={buttonSelected !== 'winners' ? 'blackAlpha.600' : '#000'} bgColor={buttonSelected === 'winners' ? 'gray.100' : null} >Winners</Button>
                                    <Button onClick={() => getTrendingStocks('lossers')} color={buttonSelected !== 'lossers' ? 'blackAlpha.600' : '#000'} bgColor={buttonSelected === 'lossers' ? 'gray.100' : null} >Lossers</Button>
                                </ButtonGroup>
                                : null
                        }
                    </Box>
                    <TableContainer margin='auto' h={h ? h : 'fit-content'} w={w ? w : 'fit-content'} overflowY={h ? 'scroll' : null} overflowX='hidden'  >
                        <Table>
                            <Tbody >
                                {data.map((stock, index) => {
                                    return (
                                        <Tr
                                            backgroundColor={stock.Type === 'buy' && 'green.100' || stock.Type === 'sell' && 'red.100'}
                                            className={type === 'investments' ? null : 'stockList'}
                                            key={index}
                                            display='flex'
                                            justifyContent='center'
                                            alignItems='center'
                                        >
                                            <Td
                                                display='flex'
                                                justifyContent='space-between'
                                                alignItems='center'
                                                gap='30px'
                                                onClick={() => handleViewDetails(stock.Symbol)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <Box
                                                    display='flex'
                                                    justifyContent='space-between'
                                                    alignItems='center'
                                                    gap='30px'
                                                >
                                                    <Box display={type === 'investments' ? 'flex' : 'none'} justifyContent='start' alignItems='center' gap='20px' >
                                                        <Text className='capitalize' fontWeight='600'>{stock.Type}</Text>
                                                    </Box>
                                                    <Box display={type === 'investments' ? 'flex' : 'none'} justifyContent='start' alignItems='center' gap='20px' >
                                                        <Text fontWeight='600'>{stock.Quantity}X</Text>
                                                    </Box>

                                                    <Box display='flex' justifyContent='space-between' alignItems='center' gap='20px' >
                                                        <Image w='35px' h='auto' src={stock.LogoUrl} />
                                                        <Box>
                                                            <Text w='100px' fontWeight='600' >{stock.CompanyName.length > 11 ? stock.CompanyName.slice(0, 11) + "..." : stock.CompanyName}</Text>
                                                            <span>{stock.Symbol}</span>
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        w='90px'
                                                        gap='10px'
                                                        display={type === 'investments' ? 'none' : 'flex'}
                                                        justifyContent='start'
                                                        className={stock.PriceChange.includes('-') ? 'stock-down' : 'stock-up'}
                                                        fontWeight='600'
                                                    >
                                                        {stock.PriceChange.includes('-') ? <StockDown /> : <StockUp />}{stock.PriceChange}
                                                    </Box>
                                                    <Box
                                                        w='70px'
                                                        gap='10px'
                                                        display='flex'
                                                        justifyContent='start'
                                                        fontWeight='600'
                                                    >
                                                        <span>{`€ ${stock.Price}`}</span>
                                                    </Box>
                                                    <Box
                                                        display={type === 'investments' ? 'flex' : 'none'}
                                                        w='70px'
                                                        gap='10px'
                                                        justifyContent='start'
                                                        fontWeight='600'
                                                    >
                                                        <span>{`€ ${stock.Amount}`}</span>
                                                    </Box>
                                                </Box>
                                            </Td>
                                            <Td>
                                                <Button
                                                    variant='ghost'
                                                    className='stockList'
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={hasStock(stock.Symbol) ? () => handleDeleteFromWatchList(stock) : () => handleAddToWatchlist(stock)}
                                                >
                                                    {hasStock(stock.Symbol) ? <FaHeart fontSize='1.3rem' /> : <FaRegHeart fontSize='1.3rem' />}
                                                </Button>
                                            </Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            }
        </>
    )
}

export default StockTable