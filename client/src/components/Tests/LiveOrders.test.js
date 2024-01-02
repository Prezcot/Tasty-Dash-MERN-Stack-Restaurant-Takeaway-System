import React from "react";
import { render, fireEvent, waitFor,getAllByText,getByText } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import '@testing-library/jest-dom/extend-expect';
import LiveOrders from "../Order/LiveOrders";

jest.mock("axios");

window.setImmediate = window.setTimeout;

describe("UNIT TEST - LIVE ORDERS COMPONENT", () => {

    it('Renders Live Orders Component Successfully', () => {
        var {getByText} =render(
        <BrowserRouter>
            <LiveOrders/>
        </BrowserRouter>);
      const titleElement01 = getByText('Live Orders');
      expect(titleElement01).toBeInTheDocument();
    
      const titleElement02 = getByText('Order History');
      expect(titleElement02).toBeInTheDocument();
      });
});


describe("INTEGRATION TEST - LIVE ORDERS COMPONENT", () => {

    it('Gets live order data from "orders" collection in MongoDB and renders items properly', async () => {
        jest.spyOn(global, 'sessionStorage', 'get').mockReturnValue({
          getItem: jest.fn((key) => {
            switch (key) {
              case 'username':
                return 'dummy_username';
              default:
                return null;
            }
          }),
          setItem: jest.fn(),
        });

        const sampleData = {
            liveOrderItems: [
              {
                order_id: '100',
                payment_id: '0SV99753NP730560E',
                email: 'dummy@gmail.com',
                paypal_email: 'sb-qrzuv28891158@personal.example.com',
                items: ['Spring rolls,1,1'],
                order_status: 'Pending',
                instructions: 'dummy instruction',
                order_total: '59.99',
              },
            ],
            orderHistoryItems: [],
          };

        axios.post.mockResolvedValueOnce({ data: sampleData });
        var {getByTestId} =render(
            <BrowserRouter>
                <LiveOrders/>
            </BrowserRouter>);
        await waitFor(() => {
          expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/orders/your_orders', {
            user: 'dummy_username',
          });
        });
        expect(getByTestId("rendered-live-order-id-test")).toHaveTextContent("100");
        expect(getByTestId("live-order-item")).toHaveTextContent("Pending");
      });


      it('Gets order history data from "collected_orders" collection in MongoDB and renders items properly', async () => {
        jest.spyOn(global, 'sessionStorage', 'get').mockReturnValue({
          getItem: jest.fn((key) => {
            switch (key) {
              case 'username':
                return 'dummy_username';
              default:
                return null;
            }
          }),
          setItem: jest.fn(),
        });

        const sampleData = {
            liveOrderItems: [],
            orderHistoryItems: [
                {
                    order_id: '99',
                    payment_id: '0SV99753NP730560E',
                    email: 'dummy@gmail.com',
                    paypal_email: 'sb-qrzuv28891158@personal.example.com',
                    items: ['Spring rolls,1,1'],
                    order_status: 'Order Has Been Collected',
                    instructions: 'dummy instruction',
                    order_total: '59.99',
                  },
            ],
          };

        axios.post.mockResolvedValueOnce({ data: sampleData });
        var {getByTestId} =render(
            <BrowserRouter>
                <LiveOrders/>
            </BrowserRouter>);
        await waitFor(() => {
          expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/orders/your_orders', {
            user: 'dummy_username',
          });
        });
        expect(getByTestId("rendered-order-history-id-test")).toHaveTextContent("99");
        expect(getByTestId("order-history-item")).toHaveTextContent("Order Has Been Collected");
      });


    it('Live Orders and Order History items are successfully differentiated', async () => {
    jest.spyOn(global, 'sessionStorage', 'get').mockReturnValue({
        getItem: jest.fn((key) => {
        switch (key) {
            case 'username':
            return 'dummy_username';
            default:
            return null;
        }
        }),
        setItem: jest.fn(),
    });

    const sampleData = {
        liveOrderItems: [
            {
                order_id: '100',
                payment_id: '0SV99753NP730560E',
                email: 'dummy@gmail.com',
                paypal_email: 'sb-qrzuv28891158@personal.example.com',
                items: ['Spring rolls,1,1'],
                order_status: 'Pending',
                instructions: 'dummy instruction',
                order_total: '59.99',
              },
        ],
        orderHistoryItems: [
            {
                order_id: '99',
                payment_id: '0SV99753NP730560E',
                email: 'dummy@gmail.com',
                paypal_email: 'sb-qrzuv28891158@personal.example.com',
                items: ['Spring rolls,1,1'],
                order_status: 'Order Has Been Collected',
                instructions: 'dummy instruction',
                order_total: '59.99',
              },
        ],
      };

    axios.post.mockResolvedValue({ data: sampleData });
    var {getByTestId} =render(
        <BrowserRouter>
            <LiveOrders/>
        </BrowserRouter>);
    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/orders/your_orders', {
        user: 'dummy_username',
        });
    });
    expect(getByTestId("live-order-item")).toBeInTheDocument();
    expect(getByTestId("order-history-item")).toBeInTheDocument();
    });
});
