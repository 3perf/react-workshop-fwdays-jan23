'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material'
import './app-wrapper.css'
import store from './store'

const theme = createTheme({
  typography: {
    fontFamily: 'inherit'
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
          color: 'black',
          borderColor: 'rgba(0, 0, 0, 0.23)',
          backgroundColor: 'white',
          '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
            backgroundColor: '#ffe866'
          },
          '&:active': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
            backgroundColor: '#ffdb01'
          }
        }
      }
    }
  }
})

const AppWrapper = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </Provider>
)

export default AppWrapper
