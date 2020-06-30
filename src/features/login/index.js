import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import api from '../../app/api';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default props => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const onLogin = () => {
    setLoading(true);
    setError(false);
    api.login(username, password)
      .then(() => {
        setSuccess(true);
        setTimeout(() => history.push('/users'), 1000);
      }).catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  return (
    <div>
      Login
      {error && <Alert severity="error">Ocorreu um erro ao fazer o login. Por favor, tente novamente!</Alert>}
      {success && <Alert severity="success">Login realizado com sucesso!</Alert>}
      <div>
        <TextField
          label="Usuário"
          style={{margin: 8}}
          disabled={loading}
          margin="normal"
          variant="outlined"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Senha"
          disabled={loading}
          style={{margin: 8}}
          margin="normal"
          type="password"
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className={classes.root}>
        <Button disabled={loading} variant="contained" color="primary" onClick={onLogin}>
          Logar
      </Button>
      </div>
    </div>
  )
}