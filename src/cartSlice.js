import { createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

const initialState = []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state,action) =>{
            let curr = {...action.payload,"quantity":1}
            state.push(curr)
        },
        increment: (state,action) =>{
            const item = state.find(i => i.id == action.payload)
            if(item){
                item.quantity++;
            }
        },
        decrement: (state,action) =>{
            const item = state.find(i => i.id == action.payload)
            if(item){
                if(item.quantity>0){
                item.quantity--;
            }
            }
        },
        remove: (state,action) =>{
          return state.filter(i=>i.id !== action.payload)
        // return state.filter(i => i.id !== action.payload)
        
        },
        clear:() =>{
            return [];
        }

    }
})
export const selectCount = (state) => state.cart.length;
export const totalAmount = (state) =>{
    let k = state.cart.reduce((total,item)=>{
        return total+= (item.quantity * item.price) 

    },0)
    return k.toFixed(2);
}
export const totalTax = (state) =>{
    let k = state.cart.reduce((total,item)=>{
        return total+= (item.quantity * item.price) 

    },0)
    return (k * 0.13).toFixed(2)
}
export const{add,increment,decrement,remove, clear} = cartSlice.actions
// export const selectCart = state.cart
export default cartSlice.reducer