import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import useFetch from "../../hooks/useFetch";
import "./roomSingle.scss";

export default function RoomSingle() {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const { data, reFetch } = useFetch(`/rooms/${id}`);

  const [startEdit, setStartEdit] = useState(false);
  const [info, setInfo] = useState(false);
  const [rooms, setRooms] = useState([]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  if (rooms.length > 0) {
    var rNumber = rooms.split(",").map((room) => ({
      number: +room,
    }));
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/rooms/${id}`,
        {
          ...info,
          roomNumbers: rNumber,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          baseURL: "https://booking-clone-app-api.herokuapp.com/api",
        }
      );
      setStartEdit(false);
      reFetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <button className="editButton" onClick={() => setStartEdit(true)}>
              Edit
            </button>
            <h1 className="title">Room Infromation</h1>
            <div className="item">
              <div className="details">
                {startEdit ? (
                  <input
                    className="formInput"
                    type="text"
                    id="title"
                    defaultValue={data.title}
                    onChange={(e) => handleChange(e)}
                    style={{ marginBottom: "10px" }}
                  />
                ) : (
                  <h1 className="itemTitle">{data.title}</h1>
                )}
                <div className="detailItem">
                  <span className="key">Price</span>
                  {startEdit ? (
                    <input
                      className="formInput"
                      type="text"
                      id="price"
                      defaultValue={data.price}
                      onChange={(e) => handleChange(e)}
                    />
                  ) : (
                    <span className="value">$ {data.price}</span>
                  )}
                </div>
                <div className="detailItem">
                  <span className="key">Max People</span>
                  {startEdit ? (
                    <input
                      className="formInput"
                      type="text"
                      id="maxPeople"
                      defaultValue={data.maxPeople}
                      onChange={(e) => handleChange(e)}
                    />
                  ) : (
                    <span className="value">{data.maxPeople}</span>
                  )}
                </div>
                <div className="detailItem">
                  <span className="key">Description</span>
                  {startEdit ? (
                    <textarea
                      id="desc"
                      cols="30"
                      rows="5"
                      defaultValue={data.desc}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                  ) : (
                    <span className="value">{data.desc}</span>
                  )}
                </div>
                <div className="detailItem">
                  <span className="key">Room Numbers</span>
                  {startEdit ? (
                    <textarea
                      id="number"
                      cols="30"
                      rows="3"
                      defaultValue={data.roomNumbers?.map((r) => r.number)}
                      onChange={(e) => setRooms(e.target.value)}
                    ></textarea>
                  ) : (
                    <ul>
                      {data.roomNumbers?.map((r, i) => (
                        <li key={i}>{r.number}</li>
                      ))}
                    </ul>
                  )}
                </div>
                {startEdit && (
                  <>
                    <button
                      onClick={() => setStartEdit(false)}
                      className="cancelButton"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => handleUpdate(e)}
                      className="saveButton"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
