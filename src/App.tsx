import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/private_route/PriveteRoute";
import { useSelector } from 'react-redux';


export function App() {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event/:id" element={<EventDetails />} />

      {/* hide from authenticated user */}
      {!isLoggedIn && <Route path="/login" element={<Login />} />}
      {!isLoggedIn && <Route path="/signup" element={<Signup />} />}

      {/* Private routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute isAuthenticated={isLoggedIn}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-event"
        element={
          <PrivateRoute isAuthenticated={isLoggedIn}>
            <CreateEvent />
          </PrivateRoute>
        }
      />
    </Routes>

  );
}

export default App;
