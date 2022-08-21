import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import useFetch from "../../hooks/useFetch";
import GetHotelRooms from "./GetHotelRooms";
import "./hotelSingle.scss";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Loading from "../../components/loading/Loading";

export default function HotelSingle() {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const { data, reFetch } = useFetch(`/hotels/find/${id}`);
  const navigate = useNavigate();

  const [sureDelete, setSureDelete] = useState(false);
  const [startEdit, setStartEdit] = useState(false);
  const [info, setInfo] = useState(false);
  const [rooms, setRooms] = useState(false);
  const [files, setFiles] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/hotels/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        baseURL: "https://booking-clone-app-api.herokuapp.com/api",
      });
      navigate("/hotels");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    setUpdateLoading(true);
    let list;
    try {
      if (files) {
        list = await Promise.all(
          Object.values(files).map(async (file) => {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/dyrksreor/image/upload",
              data,
              { baseURL: "https://booking-clone-app-api.herokuapp.com/api" }
            );
            const { url } = uploadRes.data;
            return url;
          })
        );
      } else {
        list = data.photos;
      }

      await axios.put(
        `/hotels/${id}`,
        { ...info, rooms, photos: list },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          baseURL: "https://booking-clone-app-api.herokuapp.com/api",
        }
      );
      reFetch();
      setUpdateLoading(false);
      setStartEdit(false);
    } catch (error) {
      console.log(error);
      setUpdateLoading(false);
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
            <h1 className="title">Hotel Infromation</h1>
            <div className="item">
              <div className="itemImgGroup">
                {startEdit
                  ? data.photos?.map((d, i) => (
                      <img
                        src={files ? URL.createObjectURL(files[i]) : d}
                        className="itemImg"
                      />
                    ))
                  : data &&
                    data.photos?.map((d) => (
                      <img src={d} className="itemImg" />
                    ))}
              </div>
              <div className="details">
                {startEdit && (
                  <div className="formInput">
                    <label htmlFor="file">
                      Images: <DriveFolderUploadIcon className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      multiple
                      style={{ display: "none" }}
                      onChange={(e) => setFiles(e.target.files)}
                    />
                  </div>
                )}
                {startEdit ? (
                  <input
                    className="formInput"
                    type="text"
                    id="name"
                    defaultValue={data.name}
                    onChange={(e) => handleChange(e)}
                    style={{ marginBottom: "10px" }}
                  />
                ) : (
                  <h1 className="itemTitle">{data.name}</h1>
                )}
                <div className="detailItem">
                  <span className="key">Type:</span>
                  {startEdit ? (
                    <select
                      id="type"
                      defaultValue={data.type}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="hotel">Hotel</option>
                      <option value="apartment">Apartment</option>
                      <option value="resort">Resort</option>
                      <option value="villa">Villa</option>
                      <option value="cabin">Cabin</option>
                    </select>
                  ) : (
                    <span className="value">{data.type}</span>
                  )}
                </div>
                <div className="detailItem">
                  <span className="key">City:</span>
                  {startEdit ? (
                    <input
                      className="formInput"
                      type="text"
                      id="city"
                      defaultValue={data.city}
                      onChange={(e) => handleChange(e)}
                    />
                  ) : (
                    <span className="value">{data.city}</span>
                  )}
                </div>
                <div className="detailItem">
                  <span className="key">Distance:</span>
                  {startEdit ? (
                    <input
                      className="formInput"
                      type="text"
                      id="distance"
                      defaultValue={data.distance}
                      onChange={(e) => handleChange(e)}
                    />
                  ) : (
                    <span className="value">{data.distance}</span>
                  )}
                </div>
                <div className="detailItem">
                  <span className="key">Address:</span>
                  {startEdit ? (
                    <input
                      className="formInput"
                      type="text"
                      id="address"
                      defaultValue={data.address}
                      onChange={(e) => handleChange(e)}
                    />
                  ) : (
                    <span className="value">{data.address}</span>
                  )}
                </div>
                <div className="detailItem">
                  <span className="key">Title:</span>
                  {startEdit ? (
                    <input
                      className="formInput"
                      type="text"
                      id="title"
                      defaultValue={data.title}
                      onChange={(e) => handleChange(e)}
                    />
                  ) : (
                    <span className="value">{data.title}</span>
                  )}
                </div>
                <div className="detailItem">
                  <span className="key">Description:</span>
                  {startEdit ? (
                    <textarea
                      id="desc"
                      cols="30"
                      rows="10"
                      defaultValue={data.desc}
                    ></textarea>
                  ) : (
                    <span className="value">{data.desc}</span>
                  )}
                </div>

                <GetHotelRooms
                  id={id}
                  setStartEdit={setStartEdit}
                  startEdit={startEdit}
                  rooms={rooms}
                  setRooms={setRooms}
                />

                <div className="detailItem">
                  <span className="key">Featured:</span>
                  {startEdit ? (
                    <select
                      id="featured"
                      defaultValue={data.featured}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  ) : (
                    <span className="value">
                      {data.featured ? "Yes" : "No"}
                    </span>
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

                    {updateLoading ? (
                      <Loading />
                    ) : (
                      <button
                        onClick={(e) => handleUpdate(e)}
                        className="saveButton"
                      >
                        Save
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            {!sureDelete && (
              <button
                onClick={() => setSureDelete(true)}
                className="deleteButton"
              >
                Delete
              </button>
            )}
            {sureDelete && (
              <div className="deleteConfim">
                <h3>Sure to delete hotel {data.name}?</h3>
                <button
                  className="cancelButton"
                  onClick={() => setSureDelete(false)}
                >
                  Cancel
                </button>
                <button onClick={() => handleDelete()} className="sureButton">
                  Sure! Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
