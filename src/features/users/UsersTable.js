import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ActiveIcon from '@material-ui/icons/Check';
import InactiveIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import {map, size} from 'lodash';
import React from 'react';
import {Link} from 'react-router-dom';


export default function SimpleTable(props) {
  const {users, loading, usersAmount, rowsPerPage, page, handleChangeRowsPerPage, handleChangePage} = props;

  const BodyContent = () => {
    if (size(users) > 0) {
      return (
        map(users, (row) => (
          <TableRow key={row.id}>
            <TableCell>{row.firstName}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.cpf}</TableCell>
            <TableCell>{row.active ? <ActiveIcon color="primary" /> : <InactiveIcon color="error" />}</TableCell>
            <TableCell align="right"><Link to={`/users/edit/${row.id}`}><EditIcon /></Link></TableCell>
          </TableRow>
        ))
      )
    }
    return (
      <TableRow>
        <TableCell colSpan={2}>
          Nenhum usuário encontrato com os filtros aplicados
        </TableCell>
      </TableRow>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Ativo</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading && <BodyContent />}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 50, 100, 200]}
              count={usersAmount ? usersAmount : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}