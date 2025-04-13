import React from 'react'
import { Dialog,  DialogHeader,DialogBody, DialogFooter, Button} from '@material-tailwind/react'

export default function EditProduct({setEditFormData,editData,isOpen,setIsOpen,handleEditForm}) {
    
  return (
    <>
    {/* <Button onClick={()=>{setIsOpen(!isOpen)}} variant="gradient">
      Open Dialog
    </Button> */}
    <Dialog open={isOpen} handler={()=>{setIsOpen(!isOpen)}}>
      <DialogHeader className='text-black'>Edit Product.</DialogHeader>
      <DialogBody className='text-black'>
      <input
      type="text"
      placeholder="Product Name"
      className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      value = {editData.name}
      onChange={(e)=>{
            setEditFormData({...editData,name:e.target.value})
      }}
    />
    <input
      type="text"
      placeholder="Description"
      className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      value = {editData.description}
      onChange={(e)=>{
            setEditFormData({...editData,description:e.target.value})
      }}
    />
    <input
      type="number"
      placeholder="Price"
      className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      value = {editData.price}
      onChange={(e)=>{
            setEditFormData({...editData,price:e.target.value})
      }}
    />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={()=>{setIsOpen(!isOpen)}}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleEditForm}>
          <span>Save</span>
        </Button>
      </DialogFooter>
    </Dialog>
  </>
  )
}
