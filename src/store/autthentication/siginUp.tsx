import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface SignUpData {
  username: string
  email: string
  password: string
  confirmPassword: string
  
}[]

// Define the initial state using that type
const initialState: SignUpData[] = [{
    username: 'etorres',
    email: 'torresender@gmail.com',
    password: 'etorres',
    confirmPassword: 'etorres'
}]

export const SignUp = createSlice({
  name: 'Login',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signUp: (state: SignUpData[], action) => {
      state.push(action.payload)
    },
  }
})

export const { signUp } = SignUp.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.signUp

export default SignUp.reducer