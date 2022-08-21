import { useContext } from "react";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { SearchContext } from "../../context/searchContext";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./reserve.css";
import Loading from "../loading/Loading";

export default function Reserve({ setOpenModal, hotelId }) {
  const [checkItem, setCheckItem] = useState([]);
  const { date } = useContext(SearchContext);

  const navigate = useNavigate();

  const { data, loading, error } = useFetch(`/hotels/rooms/${hotelId}`);

  const getDateInRange = (startDate, endDate) => {
    // const start = new Date(startDate);
    const date = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const alldates = getDateInRange(date[0].startDate, date[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailabelDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return isFound;
  };

  const handleCheckRoom = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setCheckItem(
      checked
        ? [...checkItem, value]
        : checkItem.filter((item) => item !== value)
    );
  };

  const handleReserve = async () => {
    try {
      await Promise.all(
        checkItem.map((roomId) => {
          const res = axios.put(
            `/rooms/availablility/${roomId}`,
            {
              date: alldates,
            },
            { baseURL: "https://booking-clone-app-api.herokuapp.com/api" }
          );
          return res.data;
        })
      );
      setOpenModal(false);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        {loading ? (
          <Loading />
        ) : (
          <>
            <FaWindowClose
              className="rClose"
              onClick={() => setOpenModal(false)}
            />
            <span>Select your room:</span>
            {data.map((item) => (
              <div className="rItem">
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">
                    Max People : <b>{item.maxPeople}</b>
                  </div>
                  {/* <div className="rPrice">Price - {item.price}</div> */}
                </div>
                <div className="rSelectRoom">
                  {item.roomNumbers.map((roomNumber) => (
                    <div className="room" key={roomNumber._id}>
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={(e) => handleCheckRoom(e)}
                        disabled={isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button className="rButton" onClick={() => handleReserve()}>
              Reserve
            </button>
          </>
        )}
      </div>
    </div>
  );
}
