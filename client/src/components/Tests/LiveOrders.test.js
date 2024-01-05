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
      const title_element_01 = getByText('Live Orders');
      expect(title_element_01).toBeInTheDocument();
    
      const title_element_02 = getByText('Order History');
      expect(title_element_02).toBeInTheDocument();
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

        const sample_data = {
            live_order_items: [
              {
                __v: 0,
                _id: "65915ebd62be743115175d94",
                username: 'dummy_user',
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
            order_history_items: [],
          };

        axios.post.mockResolvedValueOnce({ data: sample_data });
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


      it('Gets order history data from "collected_orders" and "refunds" collections in MongoDB and renders items properly', async () => {
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

        const sample_data = {
            live_order_items: [],
            order_history_items: [
                {
                    __v: 0,
                    _id: "6593f234cd4a4307d0f1d1cb",
                    username: 'dummy_user',
                    order_id: '98',
                    payment_id: '0SH79786NP730565H',
                    email: 'dummy2@gmail.com',
                    paypal_email: 'sb-qrzuv28891158@personal.example.com',
                    items: ['Spring rolls,1,1'],
                    order_status: 'Refund Needed',
                    instructions: 'dummy instruction2',
                    order_total: '70.00',
                },
                {
                    __v: 0,
                    _id: "65941714a276e08e8b93aa78",
                    username: 'dummy_user',
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

        axios.post.mockResolvedValueOnce({ data: sample_data });
        var {getAllByTestId} =render(
            <BrowserRouter>
                <LiveOrders/>
            </BrowserRouter>);
        await waitFor(() => {
          expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/orders/your_orders', {
            user: 'dummy_username',
          });
        });
        expect(getAllByTestId("rendered-order-history-id-test")[0]).toHaveTextContent("99");
        expect(getAllByTestId("order-history-item")[0]).toHaveTextContent("Order Has Been Collected");

        expect(getAllByTestId("rendered-order-history-id-test")[1]).toHaveTextContent("98");
        expect(getAllByTestId("order-history-item")[1]).toHaveTextContent("Refund Needed");
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

    const sample_data = {
        live_order_items: [
            {
              __v: 0,
              _id: "65915ebd62be743115175d94",
              username: 'dummy_user',
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
          order_history_items: [
            {
                __v: 0,
                _id: "6593f234cd4a4307d0f1d1cb",
                username: 'dummy_user',
                order_id: '98',
                payment_id: '0SH79786NP730565H',
                email: 'dummy2@gmail.com',
                paypal_email: 'sb-qrzuv28891158@personal.example.com',
                items: ['Spring rolls,1,1'],
                order_status: 'Refund Needed',
                instructions: 'dummy instruction2',
                order_total: '70.00',
            },
            {
                __v: 0,
                _id: "65941714a276e08e8b93aa78",
                username: 'dummy_user',
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

    axios.post.mockResolvedValue({ data: sample_data });
    var {getByTestId, getAllByTestId} =render(
        <BrowserRouter>
            <LiveOrders/>
        </BrowserRouter>);
    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/orders/your_orders', {
        user: 'dummy_username',
        });
    });
    expect(getByTestId("live-order-item")).toBeInTheDocument();
    expect(getAllByTestId("order-history-item")[0]).toBeInTheDocument();
    expect(getAllByTestId("order-history-item")[1]).toBeInTheDocument();
    });
});
