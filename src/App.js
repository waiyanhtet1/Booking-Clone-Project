import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { userInputs, productInputs, hotelInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/DarkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import HotelSingle from "./pages/hotelSingle/HotelSingle";
import RoomSingle from "./pages/roomSingle/RoomSingle";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectRoute>
                  <Home />
                </ProtectRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectRoute>
                    <List column={userColumns} title="User" />
                  </ProtectRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectRoute>
                    <Single />
                  </ProtectRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectRoute>
                    <New />
                  </ProtectRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectRoute>
                    <List column={hotelColumns} title="Hotel" />
                  </ProtectRoute>
                }
              />
              <Route
                path=":hotelId"
                element={
                  <ProtectRoute>
                    <HotelSingle />
                  </ProtectRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectRoute>
                    <NewHotel />
                  </ProtectRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectRoute>
                    <List column={roomColumns} title="Room" />
                  </ProtectRoute>
                }
              />
              <Route
                path=":roomId"
                element={
                  <ProtectRoute>
                    <RoomSingle />
                  </ProtectRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectRoute>
                    <NewRoom />
                  </ProtectRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
