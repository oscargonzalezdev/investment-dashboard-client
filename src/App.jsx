import { useContext } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
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
          : <Router>
            <Layout>
              <Routes>
                <Route path='/' element={<Overview />} />
                <Route path='/investments' element={<Investments />} />
                <Route path='/stocks' element={<StockList />} />
                <Route path='/stocks/:symbol' element={<StockDetails />} />
                <Route path='/wallet' element={<Wallet />} />
                <Route path='/news' element={<News />} />
                <Route path='/settings' />
                <Route path='/logout' />
              </Routes>
            </Layout>
          </Router>
      }
    </>
  )
}

export default App
