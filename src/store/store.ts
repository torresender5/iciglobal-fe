import { configureStore } from '@reduxjs/toolkit'
import Login from './autthentication/login'
import siginUp from './autthentication/siginUp';
import Loader from './loader';

export const store = configureStore({
  reducer: {
    login: Login,
    signUp: siginUp,
    loader: Loader
  }
})

export default store;

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store