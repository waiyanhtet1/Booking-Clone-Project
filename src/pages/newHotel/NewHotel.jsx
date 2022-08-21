import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useState } from "react";
import axios from "axios";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";

export default function NewHotel() {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [type, setType] = useState("");
  const [featured, setFeatured] = useState();
  const [uploadError, setUploadError] = useState([]);
  const [sendloading, setSendLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const { data, error, loading } = useFetch("/rooms");

  const handelRoomSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSendLoading(true);
    try {
      const list = await Promise.all(
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
      const newHotel = {
        ...info,
        type,
        rooms,
        photos: list,
        featured,
      };
      await axios.post("/hotels", newHotel, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        baseURL: "https://booking-clone-app-api.herokuapp.com/api",
      });
      setSendLoading(false);
      navigate("/hotels");
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
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.id === "type" ? (
                    <select
                      id={input.id}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option selected disabled>
                        Select Type!
                      </option>
                      <option value="hotel">Hotel</option>
                      <option value="apartment">Apartment</option>
                      <option value="resort">Resort</option>
                      <option value="villa">Villa</option>
                      <option value="cabin">Cabin</option>
                    </select>
                  ) : (
                    <input
                      type={input.type}
                      placeholder={input.placeholder}
                      multiple
                      id={input.id}
                      onChange={(e) => handleChange(e)}
                    />
                  )}
                  <small>
                    {uploadError?.map((e) => e.path === input.id && e.message)}
                  </small>
                </div>
              ))}

              <div className="formInput">
                <label>Featured</label>
                <select
                  id="featured"
                  onChange={(e) => setFeatured(e.target.value)}
                >
                  <option disabled selected>
                    Select Featured!
                  </option>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>

              <div className="selectRooms">
                <label>Rooms</label>
                <select
                  id="rooms"
                  multiple
                  onChange={(e) => handelRoomSelect(e)}
                >
                  {data?.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room.title}
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
