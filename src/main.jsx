import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { DataProviderWrapper } from './context/data.context'
import { BrowserRouter as Router } from "react-router-dom"

const colors = {
  brand: {
    100: '#D0EDFA',
    200: '#A5DFF9',
    300: '#7AD1F8',
    400: '#4FC3F7',
    500: '#3F51B5',
    600: '#00BCD4',
    700: '#478AD6',
    800: '#436EC6',
    900: '#3F51B5'
  },
}

const theme = extendTheme({ colors })
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <DataProviderWrapper>
        <Router>
          <App />
        </Router>
      </DataProviderWrapper>
    </ChakraProvider>
  </React.StrictMode>
)
