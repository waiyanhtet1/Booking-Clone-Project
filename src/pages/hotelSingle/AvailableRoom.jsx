import useFetch from "../../hooks/useFetch";

export default function AvailableRoom({ id }) {
  const { data, loading } = useFetch(`/hotels/rooms/${id}`);
  return (
    <ul>
      {loading
        ? "Loading..."
        : data && data?.map((room, i) => <li key={i}>{room.title}</li>)}
    </ul>
  );
}
