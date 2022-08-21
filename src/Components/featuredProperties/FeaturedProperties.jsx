import "./featruedProperties.css";
import useFetch from "../../hooks/useFetch";
import Loading from "../loading/Loading";

export default function FeaturedProperties() {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  return (
    <div className="fp">
      {loading ? (
        <Loading />
      ) : (
        <>
          {data.map((d) => (
            <div className="fpItem" key={d._id}>
              <img src={d.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{d.name}</span>
              <span className="fpCity">{d.city}</span>
              <span className="fpPrice">Starting from ${d.cheapestPrice}</span>
              {d.rating && (
                <div className="fpRating">
                  <button>{d.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
