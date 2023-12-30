import "@testing-library/jest-dom";
import {
  render,
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

jest.mock("axios");

window.setImmediate = window.setTimeout;

describe("ADMINDASHBOARD - COMPONENTS RENDER", () => {
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
});

describe("ADMIN DASHBOARD BUTTONS CHECK", () => {
  const mockOrderGet = [
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

  const mockOrderPut = [{ username: "bob" }];

  test("triggers updateOrderStatus function with correct arguments on Approve button click", async () => {
    axios.get.mockResolvedValueOnce({ data: mockOrderGet });
    axios.put.mockResolvedValueOnce({ data: mockOrderPut });

    const { queryByTestId } = render(<AdminDashboard />);

    const approveButtonBeforeFetch = queryByTestId("Approve");
    expect(approveButtonBeforeFetch).not.toBeInTheDocument();

    let approveButton;
    await waitFor(() => {
      approveButton = queryByTestId("Approve");
      expect(approveButton).toBeInTheDocument();
    });

    fireEvent.click(approveButton);

    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:3001/admin_dashboard_data/set_order_status",
      { object_id: mockOrderGet[0]._id, order_status: "Approved" }
    );
  });

  test("triggers updateOrderStatus function with correct arguments on Order Collected button click", async () => {
    axios.get.mockResolvedValueOnce({ data: mockOrderGet });
    axios.put.mockResolvedValueOnce({ data: mockOrderPut });

    const { queryByTestId } = render(<AdminDashboard />);

    const approveButtonBeforeFetch = queryByTestId("Collected");
    expect(approveButtonBeforeFetch).not.toBeInTheDocument();

    let approveButton;
    await waitFor(() => {
      approveButton = queryByTestId("Collected");
      expect(approveButton).toBeInTheDocument();
    });

    fireEvent.click(approveButton);

    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:3001/admin_dashboard_data/set_order_status",
      { object_id: mockOrderGet[0]._id, order_status: "Collected" }
    );
  });

  test("triggers move_to_refund when Decline button is clicked", async () => {
    axios.get.mockResolvedValueOnce({ data: mockOrderGet });

    const { queryByTestId } = render(<AdminDashboard />);

    await waitFor(() => {
      const declineButton = queryByTestId("Decline");
      expect(declineButton).toBeInTheDocument();
    });

    const declineButton = queryByTestId("Decline");
    fireEvent.click(declineButton);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3001/admin_dashboard_data/move_to_refund",
      { object_id: mockOrderGet[0]._id }
    );
  });
});

test("Whether data is retrieved properly in the grabData function", async () => {
  const mockData = [
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
  axios.get.mockResolvedValueOnce({ data: mockData });

  let component;

  await act(async () => {
    component = render(<AdminDashboard />);
  });

  expect(axios.get).toHaveBeenCalledWith(
    "http://localhost:3001/admin_dashboard_data/receive/order_data"
  );
});
