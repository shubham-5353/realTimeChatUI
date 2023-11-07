import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  downloadExcelData,
  getCustomerList,
} from "../Action/CustomerListAction";

const customersListSlice = createSlice({
  name: "customersList",
  initialState: {
    customerList: [],
    count: 0,
    downloadDataList: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerList.fulfilled, (state: any, action: any) => ({
        ...state,
        customerList: action.payload.rows,
        count: action.payload.count,
        isLoading: false,
      }))
      .addCase(downloadExcelData.fulfilled, (state: any, action: any) => ({
        ...state,
        downloadDataList: action.payload,
        isLoading: false,
      }))
      .addMatcher(
        isAnyOf(getCustomerList.pending, downloadExcelData.pending),
        (state: any) => {
          state.isLoading = true;
        }
      );

    // and provide a default case if no other handlers matched
  },
});

export default customersListSlice.reducer;
