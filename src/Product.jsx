import React from 'react'
import { useState } from 'react';

export default function Product({item,setEditFormData,editData,isOpen,setIsOpen,deleteData}) {
        return (
       
        <div className="bg-white/60 backdrop-blur border border-gray-200 rounded-2xl p-5 shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
           {item.name}
            </h3>
            <p className="text-gray-500 mb-2">{item.description}</p>
            <p className="text-green-600 font-bold mb-4">${item.price}</p>

            <div className="flex gap-2 mx-auto">
            <button className="bg-yellow-400 text-white py-1 px-4 rounded hover:bg-yellow-500 transition text-sm"
            onClick={()=>{
                setEditFormData(item)
                setIsOpen(!isOpen)
            }}
            >
                Edit
            </button>
            <button className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition text-sm"
            onClick = {()=>deleteData(item.id)}
            >
                Delete
            </button>
            </div>
        </div>
)
}
