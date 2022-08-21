import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";

export default function NewRoom() {
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [hotelId, setHotelId] = useState();
  const [sendloading, setSendLoading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [UploadRoomError, setUploadRoomError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const { data, error, loading } = useFetch("/hotels");

  const handleSave = async (e) => {
    e.preventDefault();
    setSendLoading(true);

    if (rooms.length > 0) {
      var rnumber = rooms?.split(",").map((room) => ({
        number: +room,
      }));
    } else {
      setSendLoading(false);
      setUploadRoomError("Fill Room Numbers!");
    }

    try {
      await axios.post(
        `/rooms/${hotelId}`,
        {
          ...info,
          roomNumbers: rnumber,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          baseURL: "https://booking-clone-app-api.herokuapp.com/api",
        }
      );
      setSendLoading(false);
      navigate("/rooms");
    } catch (error) {
      setSendLoading(false);
      setUploadError(error.response.data.message);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    onChange={(e) => handleChange(e)}
                  />
                  <small>
                    {uploadError &&
                      uploadError?.map((e) => e.path === input.id && e.message)}
                  </small>
                </div>
              ))}

              <div className="formInput">
                <label>Room Numbers</label>
                <textarea
                  cols="30"
                  rows="10"
                  placeholder="give comma between room numbers."
                  onChange={(e) => setRooms(e.target.value)}
                ></textarea>
                <small>{UploadRoomError}</small>
              </div>

              <div className="formInput">
                <label>Rooms for which hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  <option disabled selected>
                    Choose a hotel!
                  </option>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>

              {sendloading ? (
                <Loading />
              ) : (
                <button onClick={(e) => handleSave(e)}>Send</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
