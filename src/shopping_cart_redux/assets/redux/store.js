import { configureStore } from '@reduxjs/toolkit'

import { items } from '../dataset'

import testReducer from './features/test/testSlice'
import cartReducer, { addToCart } from './features/cart/cartSlice'


const store = configureStore({ 
    reducer: {
        test : testReducer,
        cart : cartReducer,
    }
})

store.dispatch(addToCart(items))

export default store