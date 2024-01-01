import {render,screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import '@testing-library/jest-dom';
import Home from '../Home/Home';
import userEvent from '@testing-library/user-event';
import SignIn from '../User/SignIn';
describe("UNIT TEST - HOME COMPONENT",()=>{
    it("Home Component Is Successfully Rendering",()=>{
        const {getAllByText}=render(<BrowserRouter>
            <Home/>
            </BrowserRouter>);
        const elementsinhome=getAllByText("Tasty Dash")[0];
    });
    it("Sign In Page Is Rendering Once Order Now Button Is Clicked",()=>{
        const {getAllByText}=render(<BrowserRouter>
            <Home/>
            </BrowserRouter>);
        const elementsinhome=getAllByText("Tasty Dash")[0];
        userEvent.click(getAllByText("Order Now")[0]);
    })
});