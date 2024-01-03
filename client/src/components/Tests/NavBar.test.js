import NavBar from '../NavBar';
import Menu from '../Menu/Menu';
import Orders from '../Order/LiveOrders';
import Dashboard from '../User/Dashboard';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

window.setImmediate = window.setTimeout;
describe("UNIT TEST - NAVBAR COMPONENT", () => {
    it("Navbar Component Is Successfully Rendering",()=>{
        const {getAllByText}=render(<BrowserRouter>
            <NavBar/>
        </BrowserRouter>);
        const checkformenu=getAllByText("Menu");
        const checkfororders=getAllByText("Orders");
        const checkfordashboard=getAllByText("Dashboard");
        expect(checkformenu.length).toBeGreaterThan(0);
        expect(checkfororders.length).toBeGreaterThan(0);
        expect(checkfordashboard.length).toBeGreaterThan(0);
    });
});

describe("INTEGRATION TEST - NAVBAR COMPONENT", () => {
    it("Menu Component Is Successfully Rendering Once Clicked",()=>{
        const {getAllByText}=render(<BrowserRouter>
            <NavBar/>
        </BrowserRouter>);
        const checkformenu=getAllByText("Menu")[0];
        userEvent.click(checkformenu);
        const renderingmenu=render(<BrowserRouter>
            <Menu/>
            </BrowserRouter>);
    });
    it("Orders Component Is Successfully Rendering Once Clicked",()=>{
        const {getAllByText}=render(<BrowserRouter>
            <NavBar/>
        </BrowserRouter>);
        const checkformenu=getAllByText("Orders")[0];
        userEvent.click(checkformenu);
        const renderingorders=render(<BrowserRouter>
            <Menu/>
            </BrowserRouter>);
    });
    it("Dashboard Component Is Successfully Rendering Once Clicked",()=>{
        const {getAllByText}=render(<BrowserRouter>
            <NavBar/>
        </BrowserRouter>);
        const checkformenu=getAllByText("Dashboard")[0];
        userEvent.click(checkformenu);
        const renderingdashboard=render(<BrowserRouter>
            <Menu/>
            </BrowserRouter>);
    });

});