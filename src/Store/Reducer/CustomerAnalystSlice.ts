import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getCustomerAnalystList,
  getMyCaseList,
  getVerifiedBy,
} from "../Action/CustomerAnalystAction";

const customersAnalystSlice = createSlice({
  name: "customerAnalyst",
  initialState: {
    customerAnalystList: [],
    creditAnalystCount:0,
    verifiedByList: [],
    myCaseList: [],
    myCaseCount:0,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerAnalystList.fulfilled, (state: any, action: any) => ({
        ...state,
        customerAnalystList: action.payload.rows,
        creditAnalystCount: action.payload.count,
        isLoading: false,
      }))
      .addCase(getVerifiedBy.fulfilled, (state: any, action: any) => ({
        ...state,
        verifiedByList: action.payload.map((elm: any) => ({value: elm.id, label: elm.name})),
        isLoading: false,
      }))
      .addCase(getMyCaseList.fulfilled, (state: any, action: any) => ({
        ...state,
        myCaseList: action.payload.rows,
        myCaseCount: action.payload.count,
        isLoading: false,
      }))
      .addMatcher(
        isAnyOf(getCustomerAnalystList.pending, getVerifiedBy.pending),
        (state: any) => {
          state.isLoading = true;
        }
      );

    // and provide a default case if no other handlers matched
  },
});

export default customersAnalystSlice.reducer;
