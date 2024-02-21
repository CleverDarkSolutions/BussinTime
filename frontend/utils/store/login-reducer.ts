// Part 1
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {User} from '@/types/auth';
import {LatLngExpression} from 'leaflet';

// Part 2
export interface LoginInitialState {
  userId: string
  token: string
  discussionId: string
}
const initialState: LoginInitialState = {
  userId: 'none',
  token: 'none',
  discussionId: 'none',
}

// Part 3
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state: LoginInitialState, action: PayloadAction<string>) => {
      return { ...state, token: action.payload };
    }
  }
})

// Part 4
export const { setToken } = loginSlice.actions
export default loginSlice.reducer
