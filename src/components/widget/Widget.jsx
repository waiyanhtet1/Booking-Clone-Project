import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import useFetch from "../../hooks/useFetch";

export default function Widget({ type }) {
  const { data, loading, error } = useFetch(
    "/hotels/countByCIty?cities=Berlin,Canberra,New York"
  );

  let value;

  switch (type) {
    case "berlin":
      value = {
        title: "Berlin",
        amount: data[0],
        icon: (
          <img
            src="https://www.tripsavvy.com/thmb/VvaRvLCcafdpJcarRCtVfoDEoPM=/5323x3549/filters:fill(auto,1)/MuseumIsland-0fd599d4eccb4a3b9da13ac2af0f1325.jpg"
            alt=""
            className="icon"
          />
        ),
      };
      break;
    case "canberra":
      value = {
        title: "Canberra",
        amount: data[1],

        icon: (
          <img
            src="http://images6.fanpop.com/image/photos/32200000/Sydney-australia-32220103-1920-1200.jpg"
            alt=""
            className="icon"
          />
        ),
      };
      break;
    case "new york":
      value = {
        title: "New York",
        amount: data[2],
        icon: (
          <img
            src="https://blog.topdeck.travel/wp-content/uploads/2018/06/cayetano-gil-518367-unsplash-2.jpg"
            alt=""
            className="icon"
          />
        ),
      };
      break;
    default:
      break;
  }

  const diff = value.amount / 2;

  return (
    <div className="widget">
      <div className="left">
        <span className="totallodgings">Total lodgings in</span>
        <span className="title">{value.title}</span>
        <span className="counter">{value.amount}</span>
      </div>
      <div className="right">
        <div className={`percentage ${diff >= 1 ? "positive" : "negative"}`}>
          {diff >= 1 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownOutlined />}
          {diff}%
        </div>
        {value.icon}
      </div>
    </div>
  );
}
