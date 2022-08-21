import "./list.scss";
import SideBar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataTable from "../../components/datatable/DataTable";

export default function List({ column, title }) {
  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <Navbar />
        <DataTable column={column} title={title} />
      </div>
    </div>
  );
}
