import React from 'react'
import { useState,useEffect } from 'react'
import axios from '../api/axios'
import { add, increment,decrement,remove} from './cartSlice'
import { selectCount } from './cartSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function Shop() {
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const cart = useSelector((state)=>state.cart)
    const cartCount = useSelector(selectCount)

    useEffect(()=>{
        const result = axios.get('/products').then(response=>{
            setProducts(response.data)
            // console.log(products)
        }).catch((error)=>{
            console.log(error.response.status)
        })
    },[]);
    // function displayCart(){
    //     const newCart = useSelector((state)=>state.cart)
    //     console.log(newCart)
    // }
    function handleBuy(product){
        dispatch(add(product)) 
        console.log(cart)
        // displayCart()
       
    }
    function handleIncrement(id){
        dispatch(increment(id));
        console.log(cart)
        // displayCart()
    }
    function handleDecrement(id){
        dispatch(decrement(id));
        console.log(cart)
        // displayCart()
    }
    function handleRemove(id){
        dispatch(remove(id))
        console.log(cart)
    }
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Shop Our Products</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products?.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                {/* Placeholder image or actual product.image */}
                                <img
                                    src={product.image || 'https://via.placeholder.com/150'}
                                    alt={product.name}
                                    className="object-contain h-full w-full"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-900 truncate">
                                    {product.name}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1 mb-3">
                                    {product.description || 'No description available.'}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-blue-600">
                                        ${product.price}
                                    </span>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                                    onClick={()=>handleBuy(product)}
                                    >
                                        Buy
                                    </button>
                                    <button onClick={()=>handleIncrement(product.id)} className='bg-blue-600 text-white'>
                                        +
                                    </button>
                                    <button onClick={()=>handleDecrement(product.id)} className='bg-blue-600 text-white'>
                                        -
                                    </button>
                                    <button onClick={()=>handleRemove(product.id)} className='bg-red-600 text-white'>
                                        []
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
