/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Need fixed any type
import axiosInstance from "@/lib/axios";
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface SearchParams {
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

export interface IFlight {
  travel_type: string;
  resultid: string;
  salecurrencycode: string;
  air_logo: string;
  itin_details: ItinDetail[];
  variants: any[];
  variant_count: number;
  price_info: IPriceInfo;
}

export interface ItinDetail {
  origindestinationorder: number;
  fare_rule: string;
  layover: number;
  flight_data: IFlightData[];
}

export interface IFlightData {
  refsegment: string;
  holdable_status: number;
  air_logo: string;
  airline_name: string;
  currency: string;
  carrier: string;
  bookingclasscode: string;
  flight_name: string;
  airlinedesignator: string;
  flightnumber: string;
  equipmentcode: string;
  equipmenttext: string;
  departuredate: string;
  arrivaldate: string;
  origincode: string;
  destinationcode: string;
  duration: number;
  baggage_details: string;
  pax_baggage: IPaxBaggage;
}

export interface IPaxBaggage {
  adult: string;
}

export interface IPriceInfo {
  base: number;
  total: number;
  currency: string;
}

interface SearchState {
  searchParams: SearchParams | null;
  flights: IFlight[];
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
    const response = await axiosInstance.post("/flights", params);

    return response.data?.data;
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
