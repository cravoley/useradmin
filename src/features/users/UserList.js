import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {performSearch} from './usersSlice';
import UsersTable from './UsersTable';



const UserList = props => {
  const userState = useSelector(state => state.users);
  const users = userState.entries;
  const loading = userState.loading;
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);


  const handleChangePage = (e, page) => {
    setPage(page);
  }

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(e.target.value);
  }

  useEffect(() => {
    dispatch(performSearch(inputValue, page, rowsPerPage));
  }, [inputValue, dispatch, page, rowsPerPage])

  return (
    <div>
      <TextField
        label="Filtro"
        fullWidth
        margin="normal"
        variant="outlined"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      {loading && <CircularProgress />}
      <UsersTable
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChangePage={handleChangePage}
        users={users}
        usersAmount={userState.totalAmount}
      />
    </div>
  )
}



export default UserList;

