import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import {useHistory} from 'react-router-dom';
import React, {useState} from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default props => {
  const classes = useStyles();
  const {user, onSave, error} = props;

  const [name, setName] = useState(user.name);
  const [cpf, setCPF] = useState(user.cpf);
  const [email, setEmail] = useState(user.email);
  const [ativo, setAtivo] = useState(user.ativo);

  const history = useHistory();

  const cancelEdit = () => {
    history.push('/users');
  }

  const saveEdit = () => {
    onSave({name, cpf, email, ativo})
  }

  return (
    <div>
      {error && (
        <Alert severity="error">Ocorreu um erro ao salvar o usuário. Por favor, tente novamente!</Alert>
      )}
      <TextField
        label="Nome"
        style={{margin: 8}}
        fullWidth
        margin="normal"
        variant="outlined"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        label="E-mail"
        style={{margin: 8}}
        fullWidth
        margin="normal"
        variant="outlined"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="CPF"
        style={{margin: 8}}
        fullWidth
        margin="normal"
        variant="outlined"
        value={cpf}
        onChange={e => setCPF(e.target.value)}
      />
      <FormControlLabel
        control={<Switch checked={ativo} onChange={e => setAtivo(e.target.checked)} />}
        label="Ativo"
      />
      <div className={classes.root}>
        <Button variant="contained" color="secondary" onClick={cancelEdit}>
          Cancelar
      </Button>
        <Button variant="contained" color="primary" onClick={saveEdit}>
          Salvar
      </Button>
      </div>
    </div>
  );
}