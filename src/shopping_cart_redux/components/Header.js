import React from 'react'
import { useSelector } from 'react-redux'
// import { cartTest } from '../assets/redux/features/cart/cartSlice'
// import { useGlobalContext } from './AppProvider'

const cartCount = state => state.cart.cartCount

const Header = () => {
    //Redux Method
    const numItems = useSelector(cartCount)
    
    // useContext state management
    // const { 
    //     state: { items }
    // } = useGlobalContext()

    // const num_items = () => {
    //     return (
    //         items.length > 0 ? 
    //         items.map( (item) => item.quantity ).reduce((a,b) => a + b) : 0
    //     )
    // }

    return (
        <header className="app_header">
            <div className="app_header_container">
                
                <h1 className="header_title">Shopping Cart</h1>
                
                <div className="header_shopping_cart">
                    <h4 className="cart_size">{numItems}</h4>
                    <i className="fas fa-shopping-cart"></i>
                </div>
            </div>
        </header>
    )
}

export default Header
