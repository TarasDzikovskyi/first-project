const cartReducer = (state = {cartItems: []}, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const item = action.payload

            const isItemExist = state.cartItems.find(
                (i) => i._id === item._id);

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i === isItemExist ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }

        case 'REMOVE_CART_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => {
                    return i._id !== action.payload
                }),
            };
        default:
            return state
    }
}

export default cartReducer

// const CartReducer = (state, action) => {
//     switch (action.type) {
//         case 'SHOW_HIDE_CART': {
//             return {
//                 ...state,
//                 showCart: !state.showCart,
//             };
//         }
//         case 'ADD_TO_CART': {
//             return {
//                 ...state,
//                 cartItems: [...state.cartItems, action.payload],
//             };
//         }
//         case 'REMOVE_ITEM': {
//             return {
//                 ...state,
//                 cartItems: state.cartItems.filter(
//                     (item) => item._id !== action.payload
//                 ),
//             };
//         }
//
//         default:
//             return state;
//     }
// };
//
// export default CartReducer;
