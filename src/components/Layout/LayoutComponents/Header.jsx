import {
  Box,
  Text,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  AvatarBadge,
  Input,
  InputGroup,
  InputLeftElement,
  Alert,
  AlertIcon,
  Heading
} from "@chakra-ui/react"
import { useContext, useState } from "react"
import { FaHeart, FaRegHeart, IoLogOutOutline, TbZoomMoney } from "react-icons/all"
import { DataContext } from "../../../context/data.context"
import styles from "../Layout.module.css"
import { stocksArr } from "../../../utils/seeds/stocksArr"
import StockTable from "../../Stocks/StocksComponents/StockTable"
import { useNavigate } from "react-router-dom"

function Header() {
  const {
    user,
    setUser,
    searchResults,
    setSearchResults,
    isSearching,
    setIsSearching,
    watchlist
  } = useContext(DataContext)
  const navigate = useNavigate()
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false)

  const handleLogOut = () => {
    navigate('/')
    setUser({userName: ''})
  }

  const handleSearchStock = (e) => {
    if (e.length > 1) {
      setIsSearching(true)
    } else {
      setIsSearching(false)
    }
    let results = stocksArr.filter(stock => {
      return stock.CompanyName.toLowerCase().includes(e.toLowerCase()) || stock.Symbol.toLowerCase().includes(e.toLowerCase())
    })
    if (results) {
      setSearchResults(results)
    }
    if (!e) {
      setSearchResults([])
    }
  }

  const handleOpenWatchlist = () => {
    setIsWatchlistOpen(!isWatchlistOpen)
  }

  return (
    <Box className={styles.header}>
      <Box p='0 20px' w='100%' display='flex' justifyContent='space-between' >
        <Box w='100%' maxW='300px'>
          <InputGroup >
            <InputLeftElement
              pointerEvents='none'
              children={<TbZoomMoney size='25px' color='#6e6e6e' />}
            />
            <Input
              backgroundColor='#fff'
              display='flex'
              flex={1}
              shadow='0.6px 0.6px 1px #ccc' id="searchBar"
              onChange={(e) => { handleSearchStock(e.target.value) }}
              type='text'
              placeholder='Search Stocks'
            />
          </InputGroup>
          <Box
            position='fixed'
            top='70px'
            zIndex='1'
            maxH='500px'
            overflow='scroll'
            overflowX='hidden'
            borderRadius={8} shadow='0 0 4px #ccc'
          >
            {
              searchResults.length < 1
                ? isSearching && <Alert w='300px' status='warning'><AlertIcon />Stock not found.</Alert>
                : <StockTable type='results' data={searchResults} title='Results' />
            }
          </Box>
        </Box>
        <Box display='flex' gap='30px'>
          <Box>
            <Button
              onClick={() => handleOpenWatchlist()}
              variant='ghost'
            >
              {watchlist.length > 0 ? <FaHeart fontSize='1.3rem' /> : <FaRegHeart fontSize='1.3rem' />}
              <Text
                fontSize='0.7rem'
                position='fixed'
                marginTop='1px'
                color='#fff'
                zIndex={1}
              >{watchlist.length}
              </Text>
            </Button>
            <Box
              display={isWatchlistOpen === true ? 'block' : 'none'}
              position='fixed'
              top='70px'
              right='140px'
              zIndex={1}
            >
              {
                watchlist.length < 1
                  ? <Box className='box'>
                    <Heading textAlign='left' marginBottom='20px' >Watchlist</Heading>
                    <Alert status='warning' borderRadius={8} display='flex' flexDirection='column' padding='30px' gap='10px' fontWeight='500'>
                      <FaRegHeart fontSize='30px' />
                      Your Watchlist is empty.<br /> Please, add the stocks you want to track.
                    </Alert>
                  </Box>
                  : <StockTable data={watchlist} type='watchlist' title='Watchlist' />
              }
            </Box>
          </Box>
          <Menu>
            <MenuButton
              as={Button}
              variant='unstyled'
              cursor='pointer'
            >
              <Box display='flex' justifyContent='right' alignItems='center' gap='10px'>
                <Text textTransform='capitalize' fontWeight='500'>{user.userName.length > 10 ? user.userName.slice(0, 9) + '...' : user.userName}</Text>
                <Avatar boxSize='35px' className='avatar'><AvatarBadge boxSize='1em' bg='green.500' /></Avatar>
              </Box>
            </MenuButton>
            <MenuList className={styles.menuList}>
              {/* <MenuItem >Profile</MenuItem>
            <MenuItem >Account</MenuItem>
            <MenuDivider /> */}
              <MenuItem icon={<IoLogOutOutline fontSize='1.5em' />} onClick={() => handleLogOut()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Box>
  )
}

export default Header