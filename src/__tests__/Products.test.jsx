import { expect,describe,test, beforeEach } from "vitest";
import { render,fireEvent,screen, findByText } from "@testing-library/react";
// import { ThemeProvider } from "@material-tailwind/react";
import "@testing-library/jest-dom";
import Products from "../Products";
import NavBar from "../NavBar";
import Login from "../Login";
import axios from "../../api/axios";
import { Provider } from "react-redux";
import { store } from "../store";
import { AuthContext } from "../../context/AuthContext";
import { BrowserRouter } from "react-router";

vi.mock('axios', async()=>{
    const actual = await vi.importActual('axios')
    return{
        ...actual
    }
});
vi.mock('@material-tailwind/react', async () => {
    const actual = await vi.importActual('@material-tailwind/react');
    return {
      ...actual,
      Dialog: ({ open, handler, children }) => (
        <div data-testid="mock-dialog">
          {open ? children : null}
        </div>
      ),
    };
  });

describe("Products",()=>{

    beforeEach(()=>{
        const mockAuth = {"name":"Sayo Law","email":"shayolaw@gmail.com"}
        const mockSetAuth = vi.fn()
        const products = {
           data:[ {
                "id": 1234,
                "name" : "Product 1",
                "price" : 12.69,
                "description" : "This is the firstv Product"
            },
            {
                "id": 1235,
                "name" : "Product 2",
                "price" : 12.69,
                "description" : "This is the Second Product"
            }],

        }
        
        // const MockedResult = {'data': {'successs':true,'message':"created succesfully"}}
        const mockedAxiosPost = vi.fn().mockResolvedValue(products);
        axios.get = mockedAxiosPost

        render(
        
        <Provider store={store}>
            <AuthContext.Provider value={{auth:mockAuth,setAuth:mockSetAuth}} >
                <Products />
            </AuthContext.Provider>
         </Provider>
        
        )
        screen.debug()
    })
    test("Products rendered succesfully",async()=>{
       
        expect(await screen.findByText('Product 1')).toBeInTheDocument();
        screen.debug()
    })
    test("Form Inputs work correctly",()=>{
        fireEvent.change(screen.getByPlaceholderText("Product Name"),{target:{value:"Johnny Boy"}})
        fireEvent.change(screen.getByPlaceholderText("Price"),{target:{value:"13.99"}})
        fireEvent.change(screen.getByPlaceholderText("Enter Description"),{target:{value:"My description"}})
        expect(screen.getByPlaceholderText("Product Name").value).toBe("Johnny Boy")
        expect(screen.getByPlaceholderText("Price").value).toBe("13.99")
        screen.debug()
    })
    test("Add New Products works correctly",async()=>{
        const new_products = {
            data:[ {
                 "id": 1234,
                 "name" : "Product 1",
                 "price" : 12.69,
                 "description" : "This is the first Product"
             },
             {
                 "id": 1235,
                 "name" : "Product 2",
                 "price" : 12.69,
                 "description" : "This is the Second Product"
             },
             ,
             {
                 "id": 1236,
                 "name" : "Product 3",
                 "price" : 22.69,
                 "description" : "This is the Third Product"
             }
            
            ],
 
         }
         axios.post = vi.fn().mockResolvedValue(new_products)
        fireEvent.click(screen.getByTestId('submitForm'))
        expect(await screen.findByText("Product added successfully!")).toBeInTheDocument() 
    })
})