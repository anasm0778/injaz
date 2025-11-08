"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import "../car_models/ModelsDataTable.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { serverUrl } from "@/utils/helper";

interface Data {
  Capacity: string;
  Status: string;
  CreatedDate: string;
  UpdatedDate: string;
}

function createData(
  Capacity: string,
  Status: string,
  CreatedDate: string,
  UpdatedDate: string
): Data {
  return {
    Capacity,
    Status,
    CreatedDate,
    UpdatedDate,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "Capacity",
    numeric: false,
    disablePadding: true,
    label: "Capacity",
  },
  // {
  //   id: "Status",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Status",
  // },
  {
    id: "CreatedDate",
    numeric: true,
    disablePadding: false,
    label: "CreatedDate",
  },
  {
    id: "UpdatedDate",
    numeric: true,
    disablePadding: false,
    label: "UpdatedDate",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{ fontWeight: "700" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell sx={{ fontWeight: "700" }} align="center">
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
const serverAPI = "https://logicrent.ae/api";
const localAPI = "http://localhost:4000";

export default function EngCapTableTest() {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("Capacity");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [searched, setSearched] = React.useState<string>("");

  const [Rows, setrows] = useState([]);

  useEffect(() => {
    axios
      .get(serverUrl + "/user/getAllcarEngineCapacities")
      .then((res) => {
        console.log(res.data.data);
        setrows(res.data.data);
        setRows(res.data.data);
        console.log(Rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const requestSearch = (searchedVal: string) => {
    setSearched(searchedVal);
    const filteredRows = rows.filter((row1: any) => {
      return (
        row1.Capacity.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row1.CreatedDate.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setrows(filteredRows);
    const b = Rows;
     ;
  };

  const cancelSearch = () => {
    const a = Rows;
     ;
    setSearched("");
    setrows(rows);
    requestSearch(searched);
  };
  const router = useRouter();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = Rows.map((n: any) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(Rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, searched, Rows, selected]
  );
  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        id="search"
        size="small"
        label="Search"
        focused
        sx={{ width: 600, marginBottom: "15px" }}
        value={searched}
        onChange={(e: any) => requestSearch(e.target.value)}
      />
      <Paper elevation={3} sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <Table
              sx={{ minWidth: 750, fontWeight: "700" }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={Rows.length}
              />
              <TableBody>
                {visibleRows.map((row: any, index) => {
                  const isItemSelected = isSelected(row.Capacity);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.Capacity)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Capacity}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.Capacity}
                      </TableCell>
                      {/* <TableCell align="left">{row.Status}</TableCell> */}
                      <TableCell align="left">{row.CreatedDate}</TableCell>
                      <TableCell align="left">{row.UpdatedDate}</TableCell>

                      <TableCell align="center">
                        <BorderColorIcon
                          color="success"
                          sx={{ marginRight: "5px" }}
                          onClick={() => {
                            localStorage.setItem(row._id, JSON.stringify(row));
                            router.push(
                              `/pages/adminAddNewEngineCapacity?verify=${row._id}`
                            );
                          }}
                        />
                        <DeleteIcon
                          color="error"
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result:any) => {
                              if (result.isConfirmed) {
                                axios
                                  .delete(
                                    serverUrl +
                                      `/user/deleteCarEngineCapacities/${row._id}`
                                  )
                                  .then((res) => {
                                    Swal.fire(
                                      "Deleted!",
                                      "Your file has been deleted.",
                                      "success"
                                    );
                                    axios
                                      .get(
                                        serverUrl +
                                          "/user/getAllcarEngineCapacities"
                                      )
                                      .then((res) => {
                                        console.log(
                                          res.data.data,
                                          "dataaaaaaaaaaaaaaaaaaaaa"
                                        );
                                        setrows(res.data.data);
                                        setRows(res.data.data);
                                        console.log(
                                          Rows,
                                          "rowssssssssssssssssssssss"
                                        );
                                      })
                                      .catch((err) => {
                                        console.log(
                                          "Error fetching data:",
                                          err
                                        );
                                      });
                                  })
                                  .catch((err) => {
                                    console.log("Error deleting row:", err);
                                  });
                              }
                            });
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
