import AdminNavBar from "./AdminNavBar";

function AdminDashboard() {
  return (
    <>
      <AdminNavBar />
      <h1>Pending Orders</h1>
      <ul className="list-group"></ul>
    </>
  );
}

export default AdminDashboard;
