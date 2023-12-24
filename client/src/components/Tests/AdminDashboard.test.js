import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AdminNavBar from "../Admin/AdminNavBar";

test("whether AdminNavBar renders properly", () => {
  render(<AdminNavBar />);
  const title = screen.getByText(/admin dashboard/i);
  expect(title).toBeInTheDocument();
});
