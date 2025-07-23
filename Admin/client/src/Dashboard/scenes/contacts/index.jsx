import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { IconButton } from "@mui/material";
import { Print as PrintIcon } from "@mui/icons-material";
import axios from "axios";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    console.log("Fetching contact data...");

    axios
      .get("http://localhost:8000/register/admin/getAllUsers")
      .then((response) => {
        console.log(response.data, 20096);

        const dataWithIds = response.data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));

        setContactData(dataWithIds);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error.message);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "_id", headerName: "Registrar ID", flex: 0.9 },
    {
      field: "name",
      headerName: "Names",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
    
      <Header title="USERS" subtitle="List of User for Future Reference" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={contactData}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
           
          }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
