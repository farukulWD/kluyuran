import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface SearchParams {
  origin: string;
  destination: string;
  departureDate: Date;
  returnDate?: Date | undefined;
  passenger: {
    adult: number;
    children: number;
    infant: number;
  };
}

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    time: string;
    date: Date;
  };
  arrival: {
    airport: string;
    time: string;
    date: Date | undefined;
  };
  duration: string;
  stops: string;
  price: number;
  class: string;
  refundable: boolean;
}

interface SearchState {
  searchParams: SearchParams | null;
  flights: Flight[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  searchParams: null,
  flights: [],
  isLoading: false,
  error: null,
};

export const searchFlights = createAsyncThunk(
  "search/searchFlights",
  async (params: SearchParams) => {
    // Simulate API call to https://api.tbp.travel/flights
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock flight data
    const mockFlights: Flight[] = [
      {
        id: "1",
        airline: "Singapore Airlines",
        flightNumber: "SQ-123",
        departure: {
          airport: params.origin,
          time: "12:10",
          date: params.departureDate as Date,
        },
        arrival: {
          airport: params.destination,
          time: "15:30",
          date: params.departureDate,
        },
        duration: "3h 20min",
        stops: "Non Stop",
        price: 450,
        class: "Business Class",
        refundable: true,
      },
      {
        id: "2",
        airline: "Qatar Airways",
        flightNumber: "QR-456",
        departure: {
          airport: params.origin,
          time: "14:30",
          date: params.departureDate,
        },
        arrival: {
          airport: params.destination,
          time: "18:45",
          date: params.departureDate,
        },
        duration: "4h 15min",
        stops: "1 Stop",
        price: 380,
        class: "Economy Class",
        refundable: false,
      },
      {
        id: "3",
        airline: "Emirates",
        flightNumber: "EK-789",
        departure: {
          airport: params.origin,
          time: "16:00",
          date: params.departureDate,
        },
        arrival: {
          airport: params.destination,
          time: "20:30",
          date: params.departureDate,
        },
        duration: "4h 30min",
        stops: "Non Stop",
        price: 520,
        class: "Business Class",
        refundable: true,
      },
    ];

    return mockFlights;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<SearchParams>) => {
      state.searchParams = action.payload;
    },
    clearSearchResults: (state) => {
      state.flights = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchFlights.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchFlights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.flights = action.payload;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Search failed";
      });
  },
});

export const { setSearchParams, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
