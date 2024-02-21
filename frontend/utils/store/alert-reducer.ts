import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AlertInitialState {
  message: string,
  type: string,
  open: boolean,
}
const initialState: AlertInitialState = {
  message: '',
  type: '',
  open: false,
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    alert: (state: AlertInitialState, action: PayloadAction<AlertInitialState>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.open = action.payload.open;
    }
  }
})

export const {alert} = alertSlice.actions
export default alertSlice.reducer
