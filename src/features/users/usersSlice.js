import {createSlice} from '@reduxjs/toolkit';
import {cloneDeep, get, set} from 'lodash';
import UserService from './UserService';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entries: [],
    totalAmount: 0,
    loading: true,
    currentUser: {},
    loadingCurrentUser: true
  },
  reducers: {
    search: (state, action) => {
      state.entries = get(action, 'payload.entries', []);
      state.totalAmount = get(action, 'payload.totalAmount', 0);
    },
    clearResults: state => {state.entries = []},
    setLoading: (state, {payload}) => {
      state.loading = payload;
    },
    setLoadingCurrentUser: (state, {payload}) => {
      state.loadingCurrentUser = payload;
    },
    setCurrentUser: (state, {payload}) => {
      state.currentUser = payload;
    }
  },
});

export const {search, clearResults, setLoading, setCurrentUser, setLoadingCurrentUser} = usersSlice.actions;

export const loadCurrentUser = id => dispatch => {
  dispatch(setLoadingCurrentUser(true));
  dispatch(setCurrentUser({}));
  UserService.getUser(id).then(data => dispatch(setCurrentUser(data)))
    .then(() => dispatch(setLoadingCurrentUser(false)));
}

export const saveUser = user => (dispatch, getState) => {
  let {users: {currentUser}} = getState();
  const {
    name,
    cpf,
    email,
    ativo,
  } = user;

  let newUser = cloneDeep(currentUser)
  set(newUser, 'firstName', name);
  set(newUser, 'cpf', cpf);
  set(newUser, 'email', email);
  set(newUser, 'active', ativo);


  dispatch(setLoadingCurrentUser(true));
  return UserService.updateUser(newUser).then(() => {
    dispatch(setCurrentUser({}));
    return null
  });
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const performSearch = (searchText, page, rowsPerPage) => dispatch => {
  dispatch(setLoading(true));
  dispatch(clearResults(true));
  UserService.search(searchText, page, rowsPerPage)
    .then(users => dispatch(search(users)))
    .then(() => dispatch(setLoading(false)));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;

export default usersSlice.reducer;
