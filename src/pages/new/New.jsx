import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userInputs } from "../../formSource";
import Loading from "../../components/loading/Loading";

export default function New() {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [sendloading, setSendLoading] = useState(false);
  const [uploadError, setUploadError] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSendLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dyrksreor/image/upload",
        data,
        { baseURL: "https://booking-clone-app-api.herokuapp.com/api" }
      );
      const { url } = uploadRes.data;
      const newUser = {
        ...info,
        img: url,
      };
      await axios.post("/auth/register", newUser, {
        baseURL: "https://booking-clone-app-api.herokuapp.com/api",
      });
      setSendLoading(false);
      navigate("/users");
    } catch (error) {
      setSendLoading(false);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
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
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              ))}

              {sendloading ? (
                <Loading />
              ) : (
                <>
                  <button disabled={sendloading} onClick={(e) => handleSave(e)}>
                    Send
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
