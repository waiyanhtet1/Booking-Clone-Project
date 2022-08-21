import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navabr/Navbar.jsx";
import SearchItem from "../../Components/searchItem/SearchItem";
import "./list.css";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import useFetch from "../../hooks/useFetch";

export default function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [listSearch, setListSearch] = useState(false);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 1}&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
    setListSearch(false);
  };

  return (
    <>
      <Navbar />
      <Header type="list" />
      {listSearch ? (
        <button
          onClick={() => setListSearch(false)}
          className="listSearchOpenButton"
        >
          Close
        </button>
      ) : (
        <button
          onClick={() => setListSearch(true)}
          className="listSearchOpenButton"
        >
          Search Again
        </button>
      )}
      <div className="listContainer">
        <div className="listWrapper">
          {listSearch && (
            <div className="listSearch">
              <h1 className="listTitle">Search</h1>
              <div className="lsItem">
                <label htmlFor="">Destination</label>
                <input
                  type="text"
                  placeholder={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="lsItem">
                <label htmlFor="">Check-in Date</label>
                <span onClick={() => setOpenDate(!openDate)}>{` ${format(
                  date[0].startDate,
                  "do-MMM-yyy"
                )} to ${format(date[0].endDate, "do-MMM-yyyy")}`}</span>
                {openDate && (
                  <DateRange
                    onChange={(item) => setDate([item.selection])}
                    minDate={new Date()}
                    ranges={date}
                  />
                )}
              </div>
              <div className="lsItem">
                <label htmlFor="">Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min Price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMin(e.target.value)}
                      className="lsOptionInput"
                      min={0}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max Price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMax(e.target.value)}
                      className="lsOptionInput"
                      min={0}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <input
                      type="number"
                      className="lsOptionInput"
                      placeholder={options.adult}
                      min={1}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <input
                      type="number"
                      className="lsOptionInput"
                      placeholder={options.children}
                      min={0}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <input
                      type="number"
                      className="lsOptionInput"
                      placeholder={options.room}
                      min={1}
                    />
                  </div>
                </div>
              </div>
              <button onClick={() => handleClick()}>Search</button>
            </div>
          )}
          <div className="listResult">
            {loading
              ? "Loading..."
              : data.map((item) => <SearchItem item={item} key={item._id} />)}
          </div>
        </div>
      </div>
    </>
  );
}
