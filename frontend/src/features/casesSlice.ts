import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';


interface CaseState {
    cases: any[];
    idFromCase: number | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: CaseState = {
    cases: [],
    idFromCase: null,
    loading: false,
    error: null,
  };
  
  export const getCases = createAsyncThunk(
    'cases/getCases',
    async ({ token, botId, fromDate, toDate,  }: { token: string; botId: string; fromDate: string; toDate: string;  }) => {
      const url = new URL('https://admindev.inceptia.ai/api/v1/inbound-case/');
      url.searchParams.append('bot', botId);
      url.searchParams.append('local_updated__date__gte', fromDate);
      url.searchParams.append('local_updated__date__lte', toDate)
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`
        }
      });
    
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
     
      const casesWithBotId = data.results.map((caseItem: any) => ({
        ...caseItem,
        botId,
      }));
  
      return {
        ...data,
        results: casesWithBotId,
      };
      
    }
  );
  
  const casesSlice = createSlice({
    name: 'cases',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCases.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getCases.fulfilled, (state, action) => {
          state.cases = action.payload.results;
          if (action.payload.results.length > 0) {
            state.idFromCase = action.payload.results[0].botId;
          }

  
          state.loading = false;
        })
        .addCase(getCases.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch cases';
        });
    },
  });

  export const selectCases = (state: RootState) => state.cases;
export default casesSlice.reducer;