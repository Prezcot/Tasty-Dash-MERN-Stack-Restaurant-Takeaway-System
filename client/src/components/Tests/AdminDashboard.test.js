import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AdminNavBar from "../Admin/AdminNavBar";
import AdminDashboard from "../Admin/AdminDashboard";
test("whether AdminNavBar renders properly", () => {
  render(<AdminNavBar />);
  const title = screen.getByText(/admin dashboard/i);
  expect(title).toBeInTheDocument();
});

test("whether AdminDashbaord renders properly", () => {
  render(<AdminDashboard />);
  const title = screen.getByText(/pending orders/i);
  expect(title).toBeInTheDocument();
});
