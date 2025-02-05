import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface IsLogin {
  isLogin: boolean | null
  token: string | null
  
}

// Define the initial state using that type
const initialState: IsLogin = {
    isLogin: localStorage.getItem('isLogin') === 'true'? true : false,
    token: localStorage.getItem('token')
}

export const Login = createSlice({
  name: 'Login',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loging: (state, action) => {
      localStorage.setItem('isLogin', action.payload.isLogin)
      state.isLogin = action.payload.isLogin
      localStorage.setItem('token', action.payload.token)
      state.token = action.payload.token
    },
  }
})

export const { loging } = Login.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.login.isLogin

export default Login.reducer