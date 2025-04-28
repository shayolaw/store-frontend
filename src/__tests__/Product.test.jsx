import { expect,describe,test, beforeEach } from "vitest";
import { render,fireEvent,screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import Product from "../Product";

describe("Product",()=>{
    //Test that the product renders properly
    let mockSetData,mockSetOpen,setDelete, Open,item
    beforeEach(()=>{
         mockSetData = vi.fn()
         mockSetOpen = vi.fn()
         setDelete = vi.fn()
         open = false;
         item = 
            {
                "id":1,
                "name":"Product 1",
                "description":"i am a product",
                "price": 20.00,

            }
            render(
                <Product 
                item={item}
                setEditFormData={mockSetData} 
                open={open} 
                setIsOpen={mockSetOpen}
                deleteData = {setDelete}
                />
           
            )
    });

    test('Product Renders properly',()=>{
        expect(screen.getByText('Product 1')).toBeInTheDocument();


    })
    //test button triggers
    test("Delete Button Triggers event properly",()=>{
        fireEvent.click(screen.getByTestId('deletebutton'))
        expect(setDelete).toHaveBeenCalledWith(item.id);

    })
    test("Edit Button Triggers event properly",()=>{
        fireEvent.click(screen.getByTestId('editbutton'))
        expect(mockSetData).toHaveBeenCalledWith(item);
        expect(mockSetOpen).toHaveBeenCalledWith(!open);
    })
})