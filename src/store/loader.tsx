import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
export interface LoaderData {
  show: boolean,
  isShow: boolean
  
}[]

// Define the initial state using that type
const initialState: LoaderData[] = [{
    show: true,
    isShow: false
}]

export const Loader = createSlice({
  name: 'Loader',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loader: (state: initialState[], action) => {
      state.push(action.payload)
    },
  }
})

export const { loader } = Loader.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.loader

export default Loader.reducer