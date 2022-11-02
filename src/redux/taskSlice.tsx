import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface NewTask {
    task_id: number,
}
const initialState: NewTask = {
    task_id: 0
}

export const addTaskSlice = createSlice({
    name: 'addTask',
    initialState: initialState,
    reducers: {
        addTask: (state, action: PayloadAction<number>) => {
            state.task_id = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { addTask } = addTaskSlice.actions

export default addTaskSlice.reducer