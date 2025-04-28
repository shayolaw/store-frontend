import '@testing-library/jest-dom'
import { describe,expect,test,beforeEach } from 'vitest'
import { screen,fireEvent,render,userEvent,within } from '@testing-library/react'
import { store } from '../store'
import axios from '../../api/axios'
import NavBar from '../NavBar'
import { AuthContext } from '../../context/AuthContext'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import Shop from '../Shop'

vi.mock('../../api/axios', () => ({
    default: {
      get: vi.fn().mockResolvedValue({
        data: [
          {
            id: 1234,
            name: "Product 1",
            price: 12.69,
            description: "This is the first Product",
          },
          {
            id: 1235,
            name: "Product 2",
            price: 12.69,
            description: "This is the Second Product",
          },
        ]
      })
    }
  }));
describe("Shop Tests",()=>{
    const mockAuth = {"name":"Sayo Law","email":"shayolaw@gmail.com"}
    const mockAuthFunction = vi.fn()
    beforeEach(()=>{
        render(
            <Provider store={store}>
                <BrowserRouter >
                <AuthContext.Provider value={{auth:mockAuth,setAuth:mockAuthFunction}} >
                    <NavBar />
                    <Shop />
                </AuthContext.Provider>
                </BrowserRouter>
            </Provider>
        )
    })

    test("Shop renders successfully",async()=>{
        expect(screen.getByText("Shop Our Products")).toBeInTheDocument()
      
    })
    test("Buy Button ",async()=>{
        const buyButtons = await screen.findAllByText("Buy");
        // Simulate a user clicking the "Buy" button
        fireEvent.click(buyButtons[0]);
        let cart = screen.getByTestId('cartCount');
        let cartCount = within(cart).getByText("1"); // Change to 2 if you're expecting 2 items in the cart
      
        // Assert that the cart count is updated correctly
        expect(cartCount).toBeInTheDocument();
    })
    test("add Button Works", async()=>{
        const buyButtons = await screen.findAllByText("Buy");
        const addButton = await screen.findAllByText("+");
        fireEvent.click(addButton[0]);
        fireEvent.click(addButton[0]);
        fireEvent.click(screen.getByTestId("showDropdown"))
        const cartitems = screen.getByTestId("cartitems")
        const checkCount = within(cartitems).getByText("Qty: 3")
        expect(checkCount).toBeInTheDocument()
        await screen.debug();
    })
    test("Delete Button Works", async()=>{
        const buyButtons = await screen.findAllByText("Buy");
        const delButton = await screen.findAllByText("-");
        fireEvent.click(delButton[0]);
        fireEvent.click(screen.getByTestId("showDropdown"))
        const cartitems = screen.getByTestId("cartitems")
        const checkCount = within(cartitems).getByText("Qty: 2")
        expect(checkCount).toBeInTheDocument()
        await screen.debug();
    })
    test("Remove Button ",async()=>{
        const remButtons = await screen.findAllByText("[]");
        // Simulate a user clicking the "Buy" button
        fireEvent.click(remButtons[0]);
        let cart = screen.getByTestId('cartCount');
        let cartCount = within(cart).getByText("0"); // Change to 2 if you're expecting 2 items in the cart
      
        // Assert that the cart count is updated correctly
        expect(cartCount).toBeInTheDocument();
    })
})