import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Loading from "../../components/loading/Loading";

export default function Single() {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const { data, reFetch } = useFetch(`/users/${id}`);

  const [sureDelete, setSureDelete] = useState(false);
  const [startEdit, setStartEdit] = useState(false);
  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        baseURL: "https://booking-clone-app-api.herokuapp.com/api",
      });
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      let img;
      if (file) {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dyrksreor/image/upload",
          data
          // { baseURL: "https://booking-clone-app-api.herokuapp.com/api" }
        );
        const { url } = uploadRes.data;
        img = url;
      } else {
        img = data.img;
      }

      await axios.put(
        `/users/${id}`,
        { ...info, img: img },
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
            <button onClick={() => setStartEdit(true)} className="editButton">
              Edit
            </button>
            <h1 className="title">User Information</h1>
            <div className="item">
              {startEdit ? (
                <img
                  src={file ? URL.createObjectURL(file) : data.img}
                  alt=""
                  className="itemImg"
                />
              ) : (
                <img src={data.img} alt="" className="itemImg" />
              )}
              <div className="details">
                {startEdit && (
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadIcon className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                )}
                {startEdit ? (
                  <input
                    type="text"
                    id="username"
                    defaultValue={data.username}
                    onChange={(e) => handleChange(e)}
                  />
                ) : (
                  <h1 className="itemTitle">{data.username}</h1>
                )}
                <table className="detailItem">
                  <tr>
                    <td>Email:</td>
                    {startEdit ? (
                      <td>
                        <input
                          onChange={(e) => handleChange(e)}
                          id="email"
                          type="text"
                          defaultValue={data.email}
                        />
                      </td>
                    ) : (
                      <td>{data.email}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Phone:</td>
                    {startEdit ? (
                      <td>
                        <input
                          onChange={(e) => handleChange(e)}
                          id="phone"
                          type="text"
                          defaultValue={data.phone}
                        />
                      </td>
                    ) : (
                      <td>{data.phone}</td>
                    )}
                  </tr>
                  <tr>
                    <td>City:</td>
                    {startEdit ? (
                      <td>
                        <input
                          onChange={(e) => handleChange(e)}
                          id="city"
                          type="text"
                          defaultValue={data.city}
                        />
                      </td>
                    ) : (
                      <td>{data.city}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Country:</td>
                    {startEdit ? (
                      <td>
                        <input
                          onChange={(e) => handleChange(e)}
                          id="country"
                          type="text"
                          defaultValue={data.country}
                        />
                      </td>
                    ) : (
                      <td>{data.country}</td>
                    )}
                  </tr>
                </table>
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
                <h3>Sure to delete user {data.username} ?</h3>
                <button
                  onClick={(e) => setStartEdit(false)}
                  className="cancelButton"
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
