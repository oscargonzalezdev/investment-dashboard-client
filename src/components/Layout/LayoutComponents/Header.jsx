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
  AlertIcon
} from "@chakra-ui/react"
import { useContext } from "react"
import { IoLogOutOutline, TbZoomMoney } from "react-icons/all"
import { DataContext } from "../../../context/data.context"
import styles from "../Layout.module.css"
import { stocksArr } from "../../../utils/seeds/stocksArr"
import StockTable from "../../Stocks/StocksComponents/StockTable"

function Header() {
  
  const { user, searchResults, setSearchResults, isSearching, setIsSearching } = useContext(DataContext)
  const handleLogOut = () => {
    return window.location.reload()
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

  return (
    <Box className={styles.header}>
      <Box p='0 20px' w='100%' display='flex' justifyContent='space-between' >
        <Box>
          <InputGroup w='400px' backgroundColor='#fff'>
            <InputLeftElement
              pointerEvents='none'
              children={<TbZoomMoney size='25px' color='#6e6e6e' />}
            />
            <Input id="searchBar" onChange={(e) => { handleSearchStock(e.target.value) }} type='text' placeholder='Search Stocks' />
          </InputGroup>
          {searchResults.length <= 0
            ? <Box
              fontWeight='500'
              position='fixed'
              top='70px'
              zIndex='1'
              w='400px'>{isSearching
                ? <Alert status='warning'>
                  <AlertIcon />
                  Stock not found.
                </Alert>
                : null}</Box>
            : <Box
              w='fit-content'
              position='fixed'
              top='70px'
              zIndex='1'
              maxH='500px'
              overflow='scroll'
              overflowX='hidden'
            >
              <StockTable data={searchResults} title='Results' />
            </Box>
          }
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
  )
}

export default Header