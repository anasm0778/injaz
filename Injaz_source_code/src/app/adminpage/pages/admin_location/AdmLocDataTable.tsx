"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";


function createData(
  name: string,
  slug: string,
  status: string,
  createdDate: string,
  updatedDate: string
) {
  return {name, slug, status, createdDate, updatedDate };
}

const rows = [
  createData(
    "Dubai",
    "dubai",
    "Active",
    "30/08/2023",
    "30/08/2023"
  ),
  createData(
    "Dubai",
    "dubai",
    "Active",
    "30/08/2023",
    "30/08/2023"
  ),
  createData(
    "Dubai",
    "dubai",
    "Active",
    "30/08/2023",
    "30/08/2023"
  ),
  createData(
    "Dubai",
    "dubai",
    "Active",
    "30/08/2023",
    "30/08/2023"
  ),
  createData(
    "Dubai",
    "dubai",
    "Active",
    "30/08/2023",
    "30/08/2023"
  ),
  createData(
    "Dubai",
    "dubai",
    "Active",
    "30/08/2023",
    "30/08/2023"
  ),
];

export default function AdmLocDataTable() {
  const router = useRouter();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Slug
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Status
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Created Date
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Updated Date
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.slug}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.createdDate}</TableCell>
              <TableCell align="center">{row.updatedDate}</TableCell>
              <TableCell align="center"><Button variant="contained" onClick={()=> router.push(`/adminpage/pages/admin_location/admin_location_form?name=${row.name}&status=${row.status.toLowerCase()}`)} size="small" color="primary">edit</Button>   <Button variant="contained" size="small" color="error">delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
