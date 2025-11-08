"use client";
import React, { useState, useEffect } from "react";
import { visuallyHidden } from "@mui/utils";
import "../../../[locale]/globals.css";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import "../car_models/ModelsDataTable.css";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "@/app/Loader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { serverUrl } from "@/utils/helper";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";

interface Data {
  name: string;
  brand: string;
  model: string;
  category: string;
  vehicleType: string;
  cheapestCar: string;
  year: string;
  status: string;
  location: string;
}

function createData(
  name: string,
  brand: string,
  model: string,
  category: string,
  vehicleType: string,
  cheapestCar: string,
  year: string,
  status: string,
  location: string
): Data {
  return {
    name,
    brand,
    model,
    category,
    vehicleType,
    cheapestCar,
    year,
    status,
    location,
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
    id: "brand",
    numeric: false,
    disablePadding: true,
    label: "Brand",
  },
  {
    id: "model",
    numeric: false,
    disablePadding: true,
    label: "Model",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: true,
    label: "Category",
  },
  {
    id: "vehicleType",
    numeric: false,
    disablePadding: true,
    label: "Vehicle Type",
  },
  {
    id: "year",
    numeric: true,
    disablePadding: false,
    label: "Year",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "location",
    numeric: true,
    disablePadding: false,
    label: "Location",
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

export default function AdminCarTable() {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [searched, setSearched] = React.useState<string>("");
  const [loader, setLoader] = useState(true);
  const [Rows, setrows] = useState([]);

  useEffect(() => {
    axios
      .get(serverUrl + "/user/getAllCars")
      .then((res) => {
        setrows(res.data.data);
        setRows(res.data.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const requestSearch = (searchedVal: string) => {
    setSearched(searchedVal);
    const filteredRows = rows.filter((row1: any) => {
      return (
        row1.brand.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row1.category.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row1.model.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row1.year.toLowerCase().includes(searchedVal.toLowerCase()) ||
        (searchedVal.toLowerCase() === "active" ||
        searchedVal.toLowerCase() === "inactive"
          ? row1.status.toLowerCase() === searchedVal.toLowerCase()
          : row1.status.toLowerCase().includes(searchedVal.toLowerCase()))
      );
    });
    setrows(filteredRows);
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
    <>
      {!loader ? (
        <Box sx={{ width: "100%" }}>
          <TextField
            id="search"
            size="small"
            focused
            label="Search"
            sx={{ width: 600, marginBottom: "15px" }}
            value={searched}
            onChange={(e: any) => requestSearch(e.target.value)}
          />
          <Paper elevation={3} sx={{ width: "100%" }}>
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
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.name)}
                          role="checkbox"
                          tabIndex={-1}
                          key={row.Name}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.brand}
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.model}
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.category}
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.vehicleType}
                          </TableCell>
                          <TableCell align="left">{row.year}</TableCell>
                          <TableCell align="left">{row.status}</TableCell>
                          <TableCell align="left">
                            {Array.isArray(row.location)
                              ? row.location.join(", ")
                              : row.location}
                          </TableCell>
                          <TableCell align="center">
                            <VisibilityIcon
                              color="secondary"
                              sx={{ marginRight: "5px" }}
                              onClick={() => {
                                console.log("CardMedia Clicked");
                                router.push(
                                  `/pages/adminCreatedCar?verify=${row._id}`
                                );
                              }}
                            />
                            <BorderColorIcon
                              color="success"
                              sx={{ marginRight: "5px" }}
                              onClick={() => {
                                router.push(
                                  `/pages/adminAddNewCar?verify=${row._id}`
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
                                }).then((result: any) => {
                                  if (result.isConfirmed) {
                                    axios
                                      .delete(
                                        serverUrl + `/user/deleteCar/${row._id}`
                                      )
                                      .then((res) => {
                                        Swal.fire(
                                          "Deleted!",
                                          "Your file has been deleted.",
                                          "success"
                                        );
                                        axios
                                          .get(serverUrl + "/user/getAllCars")
                                          .then((res) => {
                                            console.log(res.data.data);
                                            setrows(res.data.data);
                                            setRows(res.data.data);
                                            console.log(Rows);
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
      ) : (
        <>
          <br />
          <br />
          <div>
            <Loader />
          </div>
          <br />
          <br />
        </>
      )}
    </>
  );
}
