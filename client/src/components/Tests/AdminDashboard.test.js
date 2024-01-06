import "@testing-library/jest-dom";
import {
  render,
  rerender,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import AdminNavBar from "../Admin/AdminNavBar";
import AdminDashboard from "../Admin/AdminDashboard";
import axios from "axios";
import grabData from "../Admin/AdminDashboard";
import AdminOrderRefund from "../Admin/AdminOrderRefund";
import AdminCollectedOrder from "../Admin/AdminCollectedOrder";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");

window.setImmediate = window.setTimeout;

describe("UNIT-TESTS - ADMINDASHBOARD - COMPONENTS RENDER", () => {
  test("Whether AdminNavBar renders properly", () => {
    render(<AdminNavBar />);
    const title = screen.getByText(/admin dashboard/i);
    expect(title).toBeInTheDocument();
  });

  test("Whether AdminDashboard renders properly", () => {
    render(<AdminDashboard />);
    const title = screen.getByText(/pending orders/i);
    expect(title).toBeInTheDocument();
  });
  test("Whether AdminOrderRefund renders properly", () => {
    render(<AdminOrderRefund />);
    const title = screen.getByText(/refunds necessary/i);
    expect(title).toBeInTheDocument();
  });
  test("Whether AdminCollectedOrders renders properly", () => {
    render(<AdminCollectedOrder />);
    const title = screen.getByText(/collected orders/i);
    expect(title).toBeInTheDocument();
  });
});

describe("UNIT-TESTS - ADMIN DASHBOARD BUTTONS CHECK", () => {
  const mock_order_get = [
    {
      _id: { $oid: "6589e222e1a36019422ba3f4" },
      username: "bob",
      order_id: "6",
      payment_id: "PAYMENT PENDING!",
      email: "bob@gmail.com",
      items: ["Spring rolls,400,1"],
      order_status: "Pending",
      instructions: "",
      order_total: "400",
      __v: { $numberInt: "0" },
    },
  ];

  const mock_order_put = [{ username: "bob" }];

  test("triggers updateOrderStatus function with correct arguments on Approve button click", async () => {
    axios.get.mockResolvedValueOnce({ data: mock_order_get });
    axios.put.mockResolvedValueOnce({ data: mock_order_put });

    const { queryByTestId } = render(<AdminDashboard />);

    const approve_button_before_fetch = queryByTestId("Approve");
    expect(approve_button_before_fetch).not.toBeInTheDocument();

    let approve_button;
    await waitFor(() => {
      approve_button = queryByTestId("Approve");
      expect(approve_button).toBeInTheDocument();
    });

    fireEvent.click(approve_button);

    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:3001/admin_dashboard_data/set_order_status",
      { object_id: mock_order_get[0]._id, order_status: "Approved" }
    );
  });

  test("triggers move_to_refund when Decline button is clicked", async () => {
    axios.get.mockResolvedValueOnce({ data: mock_order_get });

    const { queryByTestId } = render(<AdminDashboard />);

    await waitFor(() => {
      const decline_button = queryByTestId("Decline");
      expect(decline_button).toBeInTheDocument();
    });

    const decline_button = queryByTestId("Decline");
    fireEvent.click(decline_button);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3001/admin_dashboard_data/move_to_refund",
      { object_id: mock_order_get[0]._id }
    );
  });

  test("triggers move_to_order_collected when Collected button is clicked", async () => {
    axios.get.mockResolvedValueOnce({ data: mock_order_get });

    let component;
    await act(async () => {
      component = render(<AdminDashboard />);
    });

    let approve_button;

    approve_button = component.queryByTestId("Approve");

    expect(approve_button).toBeInTheDocument();

    fireEvent.click(approve_button);
    const mock_order_get2 = [
      {
        _id: { $oid: "6589e222e1a36019422ba3f4" },
        username: "bob",
        order_id: "6",
        payment_id: "PAYMENT PENDING!",
        email: "bob@gmail.com",
        items: ["Spring rolls,400,1"],
        order_status: "Approved",
        instructions: "",
        order_total: "400",
        __v: { $numberInt: "0" },
      },
    ];
    axios.get.mockResolvedValueOnce({ data: mock_order_get2 });

    await act(async () => {
      component.rerender(<AdminDashboard />);
    });
    approve_button = component.queryByTestId("Approve");
    expect(approve_button).not.toBeInTheDocument();

    let collected_button;
    await waitFor(() => {
      collected_button = component.queryByTestId("Collected");
    });
    expect(collected_button).toBeInTheDocument();

    fireEvent.click(collected_button);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3001/admin_dashboard_data/move_to_collected_orders",
      { object_id: mock_order_get[0]._id }
    );
  });
});

describe("INTEGRATION-TESTS - DATA IS CALLED AND DISPLAYED PROPERLY IN ALL COMPONENTS ", () => {
  const mock_data = [
    {
      _id: { $oid: "6589e222e1a36019422ba3f4" },
      username: "bob",
      order_id: "6",
      payment_id: "PAYMENT PENDING!",
      email: "bob@gmail.com",
      items: ["Spring rolls,400,1"],
      order_status: "Pending",
      instructions: "",
      order_total: "400",
      __v: { $numberInt: "0" },
    },
  ];
  test("<AdminDashboard> Component", async () => {
    axios.get.mockResolvedValueOnce({ data: mock_data });

    let component;

    await act(async () => {
      component = render(<AdminDashboard />);
    });
    await act(async () => {
      component.rerender(<AdminDashboard />);
    });

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:3001/admin_dashboard_data/receive/order_data"
    );
    expect(component.getByTestId("list-item-test")).toHaveTextContent("bob");
  });
  test("<AdminOrderRefund> Component", async () => {
    axios.get.mockResolvedValueOnce({ data: mock_data });

    let component;

    await act(async () => {
      component = render(<AdminOrderRefund />);
    });
    await act(async () => {
      component.rerender(<AdminOrderRefund />);
    });

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:3001/admin_dashboard_data/receive/refund_data"
    );
    expect(component.getByTestId("list-item-test")).toHaveTextContent("bob");
  });
  test("<AdminOrderCollected> Component", async () => {
    axios.get.mockResolvedValueOnce({ data: mock_data });

    let component;

    await act(async () => {
      component = render(<AdminCollectedOrder />);
    });
    await act(async () => {
      component.rerender(<AdminCollectedOrder />);
    });

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:3001/admin_dashboard_data/receive/order_collected_data"
    );
    expect(component.getByTestId("list-item-test")).toHaveTextContent("bob");
  });
});
