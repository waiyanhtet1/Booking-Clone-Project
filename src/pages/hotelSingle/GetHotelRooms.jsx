import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import AvailableRoom from "./AvailableRoom";

export default function GetHotelRooms({ id, startEdit, rooms, setRooms }) {
  const { data } = useFetch(`/rooms`);
  const [roomError, setRoomError] = useState();

  const handleRoomSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  return (
    <div className="detailItem">
      <span className="key">Available Rooms:</span>
      {startEdit ? (
        <>
          <select id="rooms" multiple onChange={(e) => handleRoomSelect(e)}>
            {data?.map((room, i) => (
              <option key={i} value={room._id}>
                {room.title}
              </option>
            ))}
          </select>
          <span>{roomError}</span>
        </>
      ) : (
        <span className="value">
          <AvailableRoom id={id} />
        </span>
      )}
    </div>
  );
}
