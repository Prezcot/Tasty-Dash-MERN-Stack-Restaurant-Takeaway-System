import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  getAllByText,
  getByText,
} from "@testing-library/react";
import Menu from "../Menu/Menu";
import Basket from "../Order/Basket";
import Product from "../Order/Product";
import Payment from "../Payment/Payment";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");
window.setImmediate = window.setTimeout;

describe("UNIT TEST - PAYMENT COMPONENT", () => {
  it("Renders Checkout component", () => {
    const mock_navigate = jest.fn();

    const get_item_mock = jest.fn((key) => {
      switch (key) {
        case "total":
          return JSON.stringify("23.43");
        default:
          return null;
      }
    });

    const set_item_mock = jest.fn();

    jest.spyOn(global, "sessionStorage", "get").mockReturnValue({
      getItem: get_item_mock,
      setItem: set_item_mock,
    });

    var { getByText } = render(
      <BrowserRouter>
        <Payment renderPayPal={false} />
      </BrowserRouter>
    );

    var heading_in_payment = getByText("Confirm Details and Checkout");
    expect(heading_in_payment).toBeInTheDocument();
  });
});

describe("INTEGRATION TEST - PAYMENT COMPONENT", () => {
  it("Values set in Basket page appear in Payment page", () => {
    const mock_navigate = jest.fn();

    const get_item_mock = jest.fn((key) => {
      switch (key) {
        case "cart":
          return JSON.stringify(["Pizza,5.99,2"]);
        case "menu_cart":
          return JSON.stringify({ Pizza: 2 });
        case "customer_instruction":
          return "I have an allergy to nuts";
        case "total":
          return "11.98";
        default:
          return null;
      }
    });

    const set_item_mock = jest.fn();

    jest.spyOn(global, "sessionStorage", "get").mockReturnValue({
      getItem: get_item_mock,
      setItem: set_item_mock,
    });

    var { getByTestId } = render(
      <BrowserRouter>
        <Basket />
      </BrowserRouter>
    );

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mock_navigate,
    }));

    fireEvent.click(getByTestId("payment-button-test"));

    var { getByText } = render(
      <BrowserRouter>
        <Payment renderPayPal={false} />
      </BrowserRouter>
    );

    expect(getByTestId("payment-items-test")).toHaveTextContent("Pizza (x2)");
    expect(getByTestId("payment-instruction-test")).toHaveTextContent(
      "I have an allergy to nuts"
    );
    expect(getByTestId("payment-total-test")).toHaveTextContent("11.98");
  });
});
