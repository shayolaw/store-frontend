import { render,screen,fireEvent, within, waitFor, getByText } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, expect,test } from "vitest";
import NavBar from "../NavBar";
import { AuthContext } from "../../context/AuthContext";
import { Provider } from "react-redux";
import { store } from "../store";
import { useDispatch } from "react-redux";
import { increment } from "../cartSlice";
import axios from '../../api/axios'
// import axios from "axios";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";

vi.mock('axios', async()=>{
    const actual = await vi.importActual('axios')
    return{
        ...actual
    }
});

describe('NavBar',()=>{
    const mockAuth = {"name":"Sayo Law","email":"shayolaw@gmail.com"}
    const mockSetAuth = vi.fn();


    //Test that my Navigation bar renders 
    test("Navigation renders successfully",()=>{
    render(
        <Provider store={store}>
            <BrowserRouter >
                <AuthContext.Provider value={{auth:mockAuth,setAuth:mockSetAuth}} >
                    <NavBar />
                </AuthContext.Provider>
            </BrowserRouter>
        </Provider>
)
    expect(screen.getByText('ShopMate')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
})

    //Test The cart Count
    test("Cart count is correct",()=>{
        render(
            <Provider store={store}>
                <BrowserRouter >
                    <AuthContext.Provider value={{auth:mockAuth,setAuth:mockSetAuth}} >
                        <NavBar />
                    </AuthContext.Provider>
                </BrowserRouter>
            </Provider>
        )
        const cartElement = screen.getByTestId('cart');
        const cartCountElement = within(cartElement).getByText(0);
        expect(cartCountElement).toBeInTheDocument();
    })
    
    //test CheckOut
    test("Check out works", async ()=>{
        const MockedResult = {'data': {'successs':true,'message':"created succesfully"}}
        const mockedAxiosPost = vi.fn().mockResolvedValue(MockedResult);
        axios.post = mockedAxiosPost
        render(
            <Provider store={store}>
                <BrowserRouter >
                    <AuthContext.Provider value={{auth:mockAuth,setAuth:mockSetAuth}} >
                        <NavBar />
                        <ToastContainer />
                    </AuthContext.Provider>
                </BrowserRouter>
            </Provider>
        )
        fireEvent.click(screen.getByTestId('showDropdown'))
        expect(screen.getByText('Tax')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('CheckoutButton'))
        // const toast = await screen.findByText('Order Created')
        // expect(toast).toBeInTheDocument()


        screen.debug()
       
        // const message = await screen.findByText('Order Created');

    })
   

})
