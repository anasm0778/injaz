"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState,useEffect } from "react";
import axios from "axios";
import { serverUrl } from "@/utils/helper";

function createData(
  title: string,
  status: string,
  createdDate: string,
  updatedDate: string,
) {
  return { title, status, createdDate, updatedDate };
}

const serverAPI='https://logicrent.ae/api'
const localAPI ='http://localhost:4000'

export default function FeatDataTable() {

  const [rows,setrows]=useState([])
  useEffect(()=>{
    axios.get(serverUrl+"/user/getAllCarFeatures")
    .then((res)=>{
      setrows(res.data.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  })
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Status
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Created Date
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Updated Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:any) => (
            <TableRow
              key={row.Title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Title}
              </TableCell>
              <TableCell align="center">{row.Status}</TableCell>
              <TableCell align="center">{row.CreatedDate}</TableCell>
              <TableCell align="center">{row.UpdatedDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
