import React from 'react'
import axios from "../api/axios"
import { useEffect,useState } from 'react'
import Product from './Product'
import EditProduct from './Modals/EditProduct'


export default function Products() {
  const [formData,setFormData] = useState({
    "name" : "",
    "description" : "",
    "price" : "",
  })
  const [editFormData,setEditFormData] = useState({
    "name" : "sgjuuzz",
    "description" : "",
    "price" : "",
  })
  const [message, setMessage] = useState("")
  const [open, setOpen] = React.useState(false);
const [messageType, setMessageType] = useState("")
  const [products,setProducts] = useState([])
  const fetchProducts = () => {
    const result = axios.get("/products").then(response=>{
      setProducts(response.data)
      console.log(response.data)
      }).catch((error)=>{
          console.log(response.status)
      })  
  }
  useEffect(() =>{
    fetchProducts()
  },[])
  const handleSubmit = ()=>{
    console.log(formData)
    const result =  axios.post("/products",formData).then(response=>{
    setMessage("Product added successfully!")
    setMessageType("success")
    fetchProducts();
    console.log("Product Added")
    }).catch((errror)=>{
      setMessage("Product was not added!")
      setMessageType("error")
      console.log(response.error.status)
    })
  }
  const handleEditForm =()=>{
    const result = axios.put('/products/update/'+editFormData.id,editFormData).then(response=>{
      setOpen(false)
      setMessage(editFormData.name + " has been edited successfully. ")
      setMessageType("success")
      fetchProducts();
    }).catch((error)=>{
      setMessage("Product was not edited successfully!")
      setMessageType("error")
      console.log(response.error.status)
    })
  }
  const handleDelete = (id) =>{
    const result = axios.delete('/products/delete/' + id).then(response=>{
      setMessage("Deletion Succesful")
      setMessageType("success")
      fetchProducts();
    }).catch((error)=>{
      setMessage("Deletion Unsuccesful")
      setMessageType("error")
    })
  }
  setTimeout(() => {
    setMessage("")
    setMessageType("")
  }, 3000)
  return (
<div className="p-8 max-w-5xl mx-auto">
{message && (
  <div className={`p-4 mb-6 text-center rounded-lg 
    ${messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
  `}>
    {message}
  </div>
  )}
  <EditProduct 
  setEditFormData={setEditFormData} 
  editData={editFormData} 
  handleEditForm = {handleEditForm}
  isOpen={open} 
  setIsOpen={setOpen}/>
  <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
    Product Management
  </h2>

  {/* Add Product Form */}
  <div className="bg-white/70 backdrop-blur rounded-xl p-6 shadow-md mb-12 grid gap-4">
    <input
      type="text"
      value = {formData.name}
      onChange={(e)=>{
        setFormData({
          ...formData,
          "name" : e.target.value
        })
      }}
      placeholder="Product Name"
      className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <input
      type="text"
      placeholder="Description"
      value = {formData.description}
      onChange={(e)=>{
        setFormData({
          ...formData,
          "description" : e.target.value
        })
      }}
      className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <input
      type="number"
      placeholder="Price"
      value = {formData.price}
      onChange={(e)=>{
        setFormData({
          ...formData,
          "price" : e.target.value
        })
      }}
      className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button
      className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
      onClick={handleSubmit}
    >
      Add Product
    </button>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {products.map((product)=>
    <Product
     key={product.id}
    item={product}
    setEditFormData={setEditFormData} 
    editData={editFormData} 
    isOpen={open} 
    setIsOpen={setOpen}
    deleteData = {handleDelete}
    />
    )}
  </div>
</div>

  )
}
