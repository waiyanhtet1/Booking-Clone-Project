import useFetch from "../../hooks/useFetch";
import Loading from "../loading/Loading";
import "./featured.css";

export default function Featured() {
  const { data, loading, error } = useFetch(
    "/hotels/countByCIty?cities=Berlin,Canberra,New York"
  );

  return (
    <div className="featured">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://www.tripsavvy.com/thmb/VvaRvLCcafdpJcarRCtVfoDEoPM=/5323x3549/filters:fill(auto,1)/MuseumIsland-0fd599d4eccb4a3b9da13ac2af0f1325.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Berlin</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="http://images6.fanpop.com/image/photos/32200000/Sydney-australia-32220103-1920-1200.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Canberra</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://blog.topdeck.travel/wp-content/uploads/2018/06/cayetano-gil-518367-unsplash-2.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>New York</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
