export const userColumns = [
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
  },

  {
    field: "city",
    headerName: "City",
    width: 120,
  },
  {
    field: "country",
    headerName: "Country",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 130,
  },
];
export const hotelColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 300,
  },
  {
    field: "city",
    headerName: "City",
    width: 120,
  },
];

export const roomColumns = [
  {
    field: "title",
    headerName: "Title",
    width: 220,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 400,
  },
  {
    field: "price",
    headerName: "Price",
    width: 90,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
