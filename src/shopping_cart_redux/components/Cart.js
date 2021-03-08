import React, { useEffect, useCallback, useRef, useMemo } from 'react'
// import { useGlobalContext } from './AppProvider'
import CartItem from './CartItem'


import { remove_all_items, reload_cart } from '../assets/animations'

//Redux
import { useSelector, useDispatch } from 'react-redux'
import { clearCart, cartItems, cartTotalPrice, cartSize } from '../assets/redux/features/cart/cartSlice'

// const {log} = console

const Cart = () => {
    // React useContext & useReducer State Management
    // const { state:{items}, dispatch } = useGlobalContext()

    //Redux Version
    const dispatch = useDispatch()
    const items = useSelector(cartItems)
    const numItems = useSelector(cartSize)
    const total_price = useSelector(cartTotalPrice)
    const itemsJSX = useMemo( () => {
        return Object.keys(items).map(ID => {
            return <CartItem key={ID} ID={ID}/>
        })
    }, [items])

    const cart_items_list = useRef(null)
    const init = useRef(false)


    // React useContext Cart
    // const clear_cart = useCallback(() => {
    //     const tl = remove_all_items()
    //     tl.add( () => {
    //         // dispatch({ type: "REMOVE ALL ITEMS", payload:{} })
    //     }, ">0.5")
    // }, [])

    const clear_cart = useCallback(() => {
        const tl = remove_all_items()
        tl.add( () => {
            dispatch(clearCart())
        }, ">0.5")
    }, [dispatch])
    
    useEffect(() => {
        if(init.current && numItems <= 0) reload_cart()
    })

    useEffect(() => {
        init.current = true
    }, [])

    if(numItems > 0 ){
        return (
            <main className="cart_container">
            <h2 className="cart_header">Your Cart</h2>
            <div className="cart_items_container">
                <ul className="cart_items_list" ref={cart_items_list}>
                    {itemsJSX}
                </ul>
            </div>
            <div className="cart_footer_container">
                <div className="cart_total">
                    <h3>Total</h3>
                    <h3>${total_price}.00</h3>
                </div>
                <button className="cart_clear_items_btn" onClick={clear_cart}>Clear Cart</button>
            </div>
        </main>
        )
    } else{
        return (
            <main className="cart_container">
                <h2 className="cart_header">Your Cart</h2>
                <div className="cart_items_container">
                    <h4>Is currently empty...</h4>
                </div>
            </main>
        )

    }
}

export default Cart
