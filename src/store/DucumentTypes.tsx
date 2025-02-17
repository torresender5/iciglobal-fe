import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
type DocumentTypesData = {
  document_type_id: string
  document_type_code: string
  document_type_description: string
}[]
export interface DocumentTypes {
    data: DocumentTypesData
}


// Define the initial state using that type
const initialState: DocumentTypes = { data: [] }

export const DocumentTypes = createSlice({
  name: 'DocumentTypes',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    documentTypes: (state: DocumentTypes, action) => {
      state.data = action.payload
    },
  }
})

export const { documentTypes } = DocumentTypes.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.documentTypes

export default DocumentTypes.reducer