import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { typeHandler } from "../../utils";
import { useSelector } from "react-redux";

export default function PokemonTable() {

  const { pokeInfo } = useSelector(rootReducer => rootReducer.userReducer);

  const { height, weight, types } = pokeInfo;

  return (
    <TableContainer component={Paper} sx={{ height: "fit-content", maxWidth: "250px", boxShadow: "none" }}>
      <Table aria-label="a dense table">
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>Height </TableCell>
            <TableCell>{height + "cm"}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>Weight</TableCell>
            <TableCell>{weight + "g"}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>Tipo</TableCell>
            <TableCell>{typeHandler(types)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
