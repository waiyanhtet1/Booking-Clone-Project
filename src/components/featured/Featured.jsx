import "./featured.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardControlKeyOutlinedIcon from "@mui/icons-material/KeyboardControlKeyOutlined";
import useFetch from "../../hooks/useFetch";
import CountType from "../countType/CountType";

export default function Featured() {
  const { data, loading, error } = useFetch(
    "/hotels/countByCIty?cities=Berlin,Canberra,New York"
  );
  const count = data.reduce((sum, d) => sum + d, 0);
  const total = count / 2;

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Lodgings in all cities</h1>
        <MoreVertOutlinedIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={total}
            text={`${total}%`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Total Lodgings</p>
        <p className="amount">{count}</p>
        <p className="desc">Count By Property Type</p>
        <CountType />
      </div>
    </div>
  );
}
