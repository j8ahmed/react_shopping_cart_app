import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: ""
}

const testSlice = createSlice({
    name: 'test',
    initialState: initialState,
    reducers:{
        sayHello(state, action){
           state.message = "Hello World"
           return state
        }
    }
})
export const { sayHello } = testSlice.actions

export default testSlice.reducer