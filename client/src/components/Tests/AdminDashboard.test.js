import "@testing-library/jest-dom";
import { render, screen, waitFor, act } from "@testing-library/react";
import AdminNavBar from "../Admin/AdminNavBar";
import AdminDashboard from "../Admin/AdminDashboard";
import axios from "axios";
import grabData from "../Admin/AdminDashboard";

jest.mock("axios");

window.setImmediate = window.setTimeout;

test("Whether AdminNavBar renders properly", () => {
  render(<AdminNavBar />);
  const title = screen.getByText(/admin dashboard/i);
  expect(title).toBeInTheDocument();
});

test("Whether AdminDashboardrenders properly", () => {
  render(<AdminDashboard />);
  const title = screen.getByText(/pending orders/i);
  expect(title).toBeInTheDocument();
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
