import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "../src/components/Layout/Layout"
import News from "../src/components/News/News"
import StockDetails from "../src/components/StockDetails/StockDetails"
import StockList from '../src/components/StocksList/StoksList'
import Wallet from "./components/Wallet/Wallet"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={'/overview'} />
          <Route path={'/investments'} />
          <Route path={'/stocks'} element={<StockList />} />
          <Route path={'/stocks/:symbol'} element={<StockDetails />} />
          <Route path={'/wallet'} element={<Wallet />} />
          <Route path={'/news'} element={<News />} />
          <Route path={'/settings'} />
          <Route path={'/logout'} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
