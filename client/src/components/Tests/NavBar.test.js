import NavBar from "../NavBar";
import Menu from "../Menu/Menu";
import Orders from "../Order/LiveOrders";
import Dashboard from "../User/Dashboard";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

window.setImmediate = window.setTimeout;
describe("UNIT TEST - NAVBAR COMPONENT", () => {
  it("Navbar Component Is Successfully Rendering", () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const check_for_menu = getAllByText("Menu");
    const check_for_orders = getAllByText("Orders");
    const check_for_dashboard = getAllByText("Dashboard");
    expect(check_for_menu.length).toBeGreaterThan(0);
    expect(check_for_orders.length).toBeGreaterThan(0);
    expect(check_for_dashboard.length).toBeGreaterThan(0);
  });
});

describe("INTEGRATION TEST - NAVBAR COMPONENT", () => {
  it("Menu Component Is Successfully Rendering Once Clicked", () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const check_for_menu = getAllByText("Menu")[0];
    userEvent.click(check_for_menu);
    const rendering_menu = render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );
  });
  it("Orders Component Is Successfully Rendering Once Clicked", () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const check_for_menu = getAllByText("Orders")[0];
    userEvent.click(check_for_menu);
    const rendering_orders = render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );
  });
  it("Dashboard Component Is Successfully Rendering Once Clicked", () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const check_for_menu = getAllByText("Dashboard")[0];
    userEvent.click(check_for_menu);
    const rendering_dashboard = render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );
  });
});
