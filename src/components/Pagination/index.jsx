import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from "react-redux";

export default function PaginationControlled({ pokemonPage }) {
  const [page, setPage] = React.useState(1);

  const { pag } = useSelector(rootReducer => rootReducer.userReducer);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<>, value: number) => {
    setPage(value);
    dispatch({
      type: 'page',
      payload: value
    })
    pokemonPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={21} page={page} onChange={handleChange}/>
    </Stack>
  );
}