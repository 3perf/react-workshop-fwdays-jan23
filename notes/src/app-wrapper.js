import React from 'react'
import { Provider } from 'react-redux'
import { CacheProvider } from '@emotion/react'
import { createTheme, ThemeProvider } from '@mui/material'
import './app-wrapper.css'
import App from './components/App'
import store from './store'
import createEmotionCache from './createEmotionCache'

export const emotionCache = createEmotionCache()

const theme = createTheme({
  typography: {
    fontFamily: 'inherit',
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
          color: 'black',
          borderColor: 'rgba(0, 0, 0, 0.23)',
          backgroundColor: 'white',
          '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
            backgroundColor: '#ffe866',
          },
          '&:active': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
            backgroundColor: '#ffdb01',
          },
        },
      },
    },
  },
})

const AppWrapper = () => (
  <React.StrictMode>
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  </React.StrictMode>
)

export default AppWrapper
