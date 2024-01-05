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
        const elements_in_home=getAllByText("Tasty Dash");
        expect(elements_in_home.length).toBeGreaterThan(0);
    });
    
});
describe("INTEGRATION TEST - HOME COMPONENT",()=>{
    it("Sign In Page Is Rendering Once Order Now Button Is Clicked",()=>{
        const {getAllByText}=render(<BrowserRouter>
            <Home/>
            </BrowserRouter>);
        userEvent.click(getAllByText("Order Now")[0]);
        const {getAllByText:getAllByTextInSignIn}=render(<BrowserRouter>
            <SignIn/>
            </BrowserRouter>);
        expect(getAllByTextInSignIn("Sign In")[0]).toBeInTheDocument();
    })
});