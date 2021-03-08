import React, { useRef, useCallback } from 'react'
// import { useGlobalContext } from './AppProvider'
import { remove_item_anim, remove_last_item_anim } from '../assets/animations'

//Redux
import { useSelector, useDispatch } from 'react-redux'
import { cartItem, toggleQuantity, removeItem, cartSize } from '../assets/redux/features/cart/cartSlice'
// import { remove } from 'lodash'

const CartItem = ({ ID }) => {
    const cart_item = useRef(null)
    // const { 
    //     state:{items}, 
    //     dispatch 
    // } = useGlobalContext()

    const dispatch = useDispatch()
    const { name, price, quantity, image } = useSelector(cartItem(ID))

    const remove_item = useCallback( () => {
        let tl = cartSize === 1 ? remove_last_item_anim() : remove_item_anim(cart_item.current);
        tl.add( () => {
           dispatch(removeItem(ID)) 
        }, ">0.25")
    }, [ID, dispatch])

    const change_item_quantity = (num) => {
        if(num + quantity <= 0) remove_item()
        else dispatch(toggleQuantity(ID, num))
    }

    return (
        <li className="cart_item" ref={cart_item}>
            <div className="cart_item_info_container">
                <div className="cart_item_img_container">
                    <img src={image} alt={name}/>
                </div>
                <div className="cart_item_text_container">
                    <h3>{name}</h3>
                    <h4>${price}.00</h4>
                    <button className="cart_item_remove_btn" onClick={remove_item}>Remove</button>
                </div>
            </div>
            <div className="cart_item_quantity_tool">
                <button className="cart_item_quantity_btn" onClick={()=> change_item_quantity(1)}><i className="fas fa-chevron-up"></i></button>
                <h3>{quantity}</h3>
                <button className="cart_item_quantity_btn" onClick={()=> change_item_quantity(-1)}><i className="fas fa-chevron-down"></i></button>
            </div>
        </li>
    )
}

export default CartItem
