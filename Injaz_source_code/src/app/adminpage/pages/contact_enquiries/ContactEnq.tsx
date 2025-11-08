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
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { serverUrl } from "@/utils/helper";
import PublishIcon from "@mui/icons-material/Publish";
import { string } from "yup";

interface Data {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  locality: string;
  area: string;
  zipcode: string;
  date: string;
}

function createData(
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  address: string,
  city: string,
  locality: string,
  area: string,
  zipcode: string,
  date: string
): Data {
  return {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    city,
    locality,
    area,
    zipcode,
    date,
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
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: true,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "phoneNumber",
    numeric: true,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "city",
    numeric: true,
    disablePadding: false,
    label: "City",
  },
  {
    id: "locality",
    numeric: true,
    disablePadding: false,
    label: "Locality",
  },
  {
    id: "area",
    numeric: true,
    disablePadding: false,
    label: "Area",
  },
  {
    id: "zipcode",
    numeric: true,
    disablePadding: false,
    label: "Zipcode",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
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
      </TableRow>
    </TableHead>
  );
}

const serverAPI = "https://logicrent.ae/api";
const localAPI = "http://localhost:4000";

export default function ContactEnq() {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("firstName");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [searched, setSearched] = React.useState<string>("");

  const [Rows, setrows] = useState([]);

  useEffect(() => {
    axios
      .get(serverUrl + "/user/getAllcontactenquiries")
      .then((res) => {
        console.log(res.data.data, "dataaaaaaaaaaaaaaaaaaaaa");
        setrows(res.data.data);
        setRows(res.data.data);
        console.log(Rows, "rowssssssssssssssssssssss");
      })
      .catch((err) => {
        console.log("ddddddddddddd");
      });
  }, []);

  const exportToExcel = () => {
    const dataForExcel = Rows.map((row: any) => [
      row.firstName,
      row.lastName,
      row.email,
      row.phoneNumber,
      row.address,
      row.city,
      row.locality,
      row.area,
      row.zipcode,
      row.date,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([
      [
        "First Name",
        "Last Name",
        "Email",
        "Phone Number",
        "Address",
        "City",
        "Locality",
        "Area",
        "Zipcode",
        "Date",
      ],
      ...dataForExcel,
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contact Enquiries");
    XLSX.writeFile(wb, "contact_enquiries.xlsx");
  };

  const requestSearch = (searchedVal: any) => {
    setSearched(searchedVal);
    const filteredRows = rows.filter((row1: any) => {
       ;
      return (
        row1.firstName?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row1.city?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row1.lastName?.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setrows(filteredRows);
    const b = Rows;
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
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <TextField
            id="search"
            size="small"
            label="Search"
            focused
            sx={{ width: 600 }}
            value={searched}
            onChange={(e: any) => requestSearch(e.target.value)}
          />
          <div style={{ textAlign: "end" }}>
            <Button
              startIcon={<PublishIcon />}
              variant="contained"
              color="primary"
              sx={{ textTransform: "capitalize" }}
              onClick={exportToExcel}
            >
              Export
            </Button>
          </div>
        </Box>
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
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      // {Rows.map((row:any) => (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row._id)}
                        role="checkbox"
                        // aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        // selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.firstName}
                        </TableCell>
                        {/* <TableCell align="left">{row.slag}</TableCell> */}
                        <TableCell align="left">{row.lastName}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.phoneNumber}</TableCell>
                        <TableCell align="left">{row.address}</TableCell>
                        <TableCell align="left">{row.city}</TableCell>
                        <TableCell align="left">{row.locality}</TableCell>
                        <TableCell align="left">{row.area}</TableCell>
                        <TableCell align="left">{row.zipcode}</TableCell>
                        <TableCell align="left">{row.date}</TableCell>

                        {/* <TableCell align="center">
                        <BorderColorIcon
                          color="success"
                          sx={{ marginRight: "5px" }}
                          onClick={() =>
                            router.push(
                              `/adminpage/pages/required_docs/req_docs_from?Title=${row.Title}&Status=${row.Status.toLowerCase()}`
                            )
                          }
                        />
                        <DeleteIcon color="error" />
                      </TableCell> */}
                      </TableRow>
                      // ))}
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
    </>
  );
}
