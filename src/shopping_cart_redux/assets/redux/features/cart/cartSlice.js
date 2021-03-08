import { createSlice } from '@reduxjs/toolkit'

//selectors
export const cartItems = state => state.cart.cartItems
export const cartTotalPrice = state => state.cart.totalPrice
export const cartSize = state => state.cart.cartCount
export const cartItem = (id) => state => state.cart.cartItems[id]

const initialState = {
    cartCount: 0,
    totalPrice: 0,
    cartItems: {}
}    

//util functions
const removeCartItem = (id, state) => {
    state.cartCount -= 1
    state.totalPrice -= state.cartItems[id].quantity * state.cartItems[id].price
    delete state.cartItems[id]
    return state
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers:{
        addToCart:{
            reducer(state, action){
                // Items should always be an object with new 
                // cartItem objects as it's properties
                const items = action.payload
                
                for( const property in items ){
                    const newItem = items[property]
                    state.cartItems[property] = items[property]
                    state.totalPrice += newItem.quantity * newItem.price
                    state.cartCount++
                }
            },
            prepare(items){
                const newItems = {}
                items.forEach(item => {
                    const ID = Math.floor(Math.random() * 100)
                    newItems[ID] = item
                })

                return { payload: newItems }
            }
        },
        clearCart(state){
            state.cartItems = {}
            state.totalPrice = 0
            state.cartCount = 0
        },
        removeItem(state, action){
            const id = action.payload
            removeCartItem(id, state)
        },
        toggleQuantity:{
            reducer(state, action){
                const {id, num} = action.payload
                const item = state.cartItems[id]

                item.quantity += num
                state.cartCount += num
                state.totalPrice += num * item.price
            },
            prepare(id, num){
                return {
                    payload: { id, num }
                }
            }
        },
    },
})

export const { 
    addToCart, 
    clearCart, 
    removeItem, 
    toggleQuantity,
} = cartSlice.actions 

export default cartSlice.reducer

