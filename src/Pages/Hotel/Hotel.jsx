import "./hotel.css";
import Navbar from "../../Components/Navabr/Navbar";
import Header from "../../Components/Header/Header";
import MailList from "../../Components/mailList/MailList";
import Footer from "../../Components/footer/Footer";
import Reserve from "../../Components/reserve/Reserve";
import useFetch from "../../hooks/useFetch";

import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaMapMarkerAlt,
  FaWindowClose,
} from "react-icons/fa";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/searchContext";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../Components/loading/Loading";

export default function Hotel() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const navigate = useNavigate();

  const { data, loading } = useFetch(`/hotels/find/${id}`);

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { date, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(date[0].endDate, date[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleArrow = (direction) => {
    let newSlideNumber;
    if (direction === "left") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleReserve = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <Loading />
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FaWindowClose className="close" onClick={() => setOpen(false)} />
              <FaArrowCircleLeft
                className="arrow"
                onClick={() => handleArrow("left")}
              />
              <div className="slideWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="slideImg"
                />
              </div>
              <FaArrowCircleRight
                className="arrow"
                onClick={() => handleArrow("right")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <h1 className="hotelTitle">{data.name}</h1>
            <button className="bookNow" onClick={() => handleReserve()}>
              Reserve or Book Now!
            </button>
            <div className="hotelAddress">
              <FaMapMarkerAlt />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailText">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={() => handleReserve()}>
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpenModal={setOpenModal} hotelId={id} />}
    </div>
  );
}
