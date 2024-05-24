import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store'


interface Bot {
  id: number;
  name: string;
  alias: string;
  users: [];
}

interface BotsState {
  bots: Bot[];
  error: string | null;
}

const initialState: BotsState = {
  bots: [],
  error: null,
};

export const fetchBots = createAsyncThunk(
  'bots/fetchBots',
  async (token: string) => {
    const response = await fetch('https://admindev.inceptia.ai/api/v1/clients/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `JWT ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
  
    return data as Bot[];
  }
);

const botsSlice = createSlice({
  name: 'bots',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBots.fulfilled, (state, action: PayloadAction<Bot[]>) => {
        state.bots = action.payload;
        state.error = null;
      })
      .addCase(fetchBots.rejected, (state, action) => {
        state.bots = [];
        state.error = action.error.message || 'Failed to fetch bots';
      });
  },
});

export const selectBots = (state: RootState) => state.bots;
export default botsSlice.reducer;