import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  getAllByText,
  getByText,
} from "@testing-library/react";
import Menu from "../Menu/Menu";
import Item from "../Menu/Item";
import Cart from "../Menu/Cart";
import Basket from "../Order/Basket";
import HomeMenu from "../Home/HomeMenu";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import "@testing-library/jest-dom";

jest.mock("axios");
window.setImmediate = window.setTimeout;

describe("UNIT TEST - HOMEMENU COMPONENT", () => {
  it("Menu Component Is Successfully Rendering", () => {
    var { getAllByText } = render(
      <BrowserRouter>
        <HomeMenu />
      </BrowserRouter>
    );
    const elementswithmenu = getAllByText("Our Offerings");
    expect(elementswithmenu.length).toBeGreaterThan(0);
  });

  it("Menu Items Are Successfully Rendering", () => {
    var { getAllByText } = render(
      <BrowserRouter>
        <HomeMenu />
      </BrowserRouter>
    );
    setTimeout(() => {
      const elementswithmenu = getAllByText("$");
      expect(elementswithmenu.length).toBeGreaterThan(0);
    }, 5000);
  });
});
