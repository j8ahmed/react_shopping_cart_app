import './css/index.css'
import React, { useEffect } from 'react'

//Redux
import { Provider } from 'react-redux'
import store from './assets/redux/store'

import Header from './components/Header'
import Cart from './components/Cart'
// import { AppProvider } from './components/AppProvider'

import { load_app } from './assets/animations'

const Index = () => {

    useEffect(() => {
        load_app()
    }, [])
    return (
        // Redux RTK version
        <Provider store={store}>
            <Header />
            <Cart />
        </Provider>

        //Uses React useContext/CreateContext API
        // <AppProvider>
        //     <Header />
        //     <Cart />
        // </AppProvider>
    )
}

export default Index
