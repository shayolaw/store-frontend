import '@testing-library/jest-dom'
import { screen,fireEvent,render,waitFor } from '@testing-library/react'
import { describe,test,expect,beforeEach } from 'vitest'
import Login from '../Login'
import axios from "../../api/axios"
import { BrowserRouter } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
vi.mock("../../api/axios", () => ({
    default: {
      get: vi.fn().mockRejectedValue(new Error("Network Error")),
    //   post: vi.fn()
    }
  }))
describe("Login Test",()=>{
    const mockAuth = {"name":"Sayo Law","email":"shayolaw@gmail.com"}
    const mockSetAuth = vi.fn()
    beforeEach(()=>{
        render(
            <AuthContext.Provider value={{auth:mockAuth,setAuth:mockSetAuth}}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </AuthContext.Provider>
        )
    })
    test("Login Renders Succesfully",()=>{
        expect(screen.getByText("Login To Your Account")).toBeInTheDocument()
    })
    test("we can type in email input",()=>{
        fireEvent.change(screen.getByPlaceholderText("Enter your email"),{target:{value:"dele@gmail.com"}})
        expect(screen.getByPlaceholderText("Enter your email").value).toBe("dele@gmail.com")
       
    })
    test("we can type in password input",()=>{
        fireEvent.change(screen.getByPlaceholderText("Enter your password" ),{target:{value:"12345678"}})
        expect(screen.getByPlaceholderText("Enter your password").value).toBe("12345678")
       
    })
    test("We can submit our form and show error", async () => {
        const submitB = screen.getByTestId("loginbutton");
        fireEvent.click(submitB);
        // expect(await screen.getByText("Network Error"))
        await waitFor(() => {
            expect(screen.getByText(/network error/i)).toBeInTheDocument();
          });

    })
})