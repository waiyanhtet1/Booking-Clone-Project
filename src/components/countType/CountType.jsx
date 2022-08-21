import useFetch from "../../hooks/useFetch";
import "./countType.scss";

export default function CountType() {
  const { data } = useFetch("/hotels/countByType");
  return (
    <div className="summary">
      <table className="tableType">
        {data?.map((d) => (
          <tr key={d.i}>
            <td className="type">{d.type}</td>
            <td className="value">{d.count}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
