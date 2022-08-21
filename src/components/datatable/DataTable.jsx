import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function DataTable({ column, title }) {
  const { pathname } = useLocation();
  const { data } = useFetch(`${pathname}`);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`${pathname}/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}s
        <Link to={`${pathname}/new`} className="link">
          Add New {title}
        </Link>
      </div>
      <DataGrid
        className="dataGrid"
        rows={data}
        columns={column.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[7]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
}
