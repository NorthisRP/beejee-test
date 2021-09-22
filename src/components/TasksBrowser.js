import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTasks } from "../store/taskReducer";
import "../styles/table.scss";

export default function TasksBrowser() {
  const data = useSelector((state) => state.taskReducer);
  const token = useSelector((state) => state.authReducer)?.token;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("id");
  const [sortDir, setSortDir] = useState(true);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(fetchTasks({ page, sortField, sortDir }));
  }, [dispatch, page, sortField, sortDir]);

  const handleSort = (event) => {
    const value = event.target.innerText.toLowerCase();
    if (value === sortField) {
      setSortDir((prev) => !prev);
    } else {
      setSortField(value);
    }
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell
              className={`clickable${sortField === "id" ? " sort" : ""}${
                sortDir ? "" : " inverted"
              }`}
              onClick={handleSort}
            >
              Id
            </TableCell>
            <TableCell
              className={`clickable${sortField === "email" ? " sort" : ""}${
                sortDir ? "" : " inverted"
              }`}
              onClick={handleSort}
            >
              Email
            </TableCell>
            <TableCell
              className={`clickable${sortField === "username" ? " sort" : ""}${
                sortDir ? "" : " inverted"
              }`}
              onClick={handleSort}
            >
              Username
            </TableCell>
            <TableCell>Text</TableCell>
            <TableCell
              className={`clickable${sortField === "status" ? " sort" : ""}${
                sortDir ? "" : " inverted"
              }`}
              onClick={handleSort}
            >
              Status
            </TableCell>
            <TableCell>Image</TableCell>
            {token && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.tasks.map((row) => (
            <TableRow hover key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.text}</TableCell>
              <TableCell>
                {row.status.length === 1 ? (
                  <p>Не выполнено</p>
                ) : (
                  <p>Выполнено</p>
                )}
                {(row.status === 1 || row.status === 11) && (
                  <p>Отредактировано</p>
                )}
              </TableCell>
              <TableCell>
                <img width={80} src={row?.image_path} alt={"Something"} />
              </TableCell>
              {token && (
                <TableCell>
                  <Link to={`/edit/${row.id}`}>Edit</Link>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil(data.total_task_count / 3)}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </TableContainer>
  );
}
