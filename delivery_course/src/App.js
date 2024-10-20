import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminMenuPage from "./pages/AdminMenuPage";
import AdminUserPage from "./pages/AdminUserPage";
import MainPage from "./pages/MainPage";
import OrderEditor from "./pages/OrderEditor";
import ProfilePage from "./pages/ProfilePage";
import NotificationPage from "./pages/NotificationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin/orders" element={<OrderEditor />} />
        <Route path="/admin/menuItems" element={<AdminMenuPage />} />
        <Route path="/admin/users" element={<AdminUserPage />} />
        <Route path="/admin/mail" element={<NotificationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
