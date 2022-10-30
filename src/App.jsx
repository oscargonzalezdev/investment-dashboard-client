import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "../src/components/Layout/Layout"
import News from "../src/components/News/News"
import StockDetails from "../src/components/Stocks/StocksComponents/StockDetails"
import StockList from '../src/components/Stocks/Stoks'
import Investments from "./components/Investments/Investments"
import Overview from "./components/Overview/Overview"
import Wallet from "./components/Wallet/Wallet"
import { Welcomme } from "./components/Welcomme/Welcomme"
import { DataContext } from "./context/data.context"

function App() {
  const { user } = useContext(DataContext)
  return (
    <>
      {
        user.userName === ''
          ? <Welcomme />
          : <Layout>
            <Routes>
              <Route path='/overview' element={<Overview />} />
              <Route path='/investments' element={<Investments />} />
              <Route path='/stocks' element={<StockList />} />
              <Route path='/stocks/:symbol' element={<StockDetails />} />
              <Route path='/wallet' element={<Wallet />} />
              <Route path='/news' element={<News />} />
              <Route path='*' element={<Overview />} />
            </Routes>
          </Layout>
      }
    </>
  )
}

export default App
