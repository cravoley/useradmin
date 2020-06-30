import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import UserForm from './UserForm';
import {loadCurrentUser, saveUser} from './usersSlice';

export default props => {
  const {userId} = props.match.params;
  const userState = useSelector(state => state.users);
  const currentUser = userState.currentUser;
  const loading = userState.loadingCurrentUser;
  const history = useHistory();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCurrentUser(userId))
  }, [userId, dispatch])


  if (success) {
    return (
      <>
        <Alert severity="success" style={{marginBottom: 20}}>Usuário salvo com sucesso.</Alert>
        <Button variant="outlined" onClick={() => history.push('/users')}>Voltar para lista</Button>
      </>
    )
  } else if (loading || !currentUser) {
    return <CircularProgress />
  }

  const handleSave = user => {
    dispatch(saveUser(user)).then(() => {
      setSuccess(true);
    }).catch(() => setError(true));
  }
  
  const user = {
    name: currentUser.firstName,
    cpf: currentUser.cpf,
    email: currentUser.email,
    ativo: currentUser.active
  };
  return <UserForm error={error} user={user} onSave={handleSave} />;
}