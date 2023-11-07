import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getCustomerSupportList } from "../Action/CustomerSupportAction";

const customersSupportSlice = createSlice({
  name: "customerSupport",
  initialState: {
    customerSupportList: [],
    customerSupportCount:0,
    // verifiedByList: [],
    // myCaseList: [],
    // myCaseCount:0,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerSupportList.fulfilled, (state: any, action: any) => ({
        ...state,
        customerSupportList: action.payload.rows,
        customerSupportCount: action.payload.count,
        isLoading: false,
      }))
    //   .addCase(getVerifiedBy.fulfilled, (state: any, action: any) => ({
    //     ...state,
    //     verifiedByList: action.payload.map((elm: any) => ({value: elm.id, label: elm.name})),
    //     isLoading: false,
    //   }))
    //   .addCase(getMyCaseList.fulfilled, (state: any, action: any) => ({
    //     ...state,
    //     myCaseList: action.payload.rows,
    //     myCaseCount: action.payload.count,
    //     isLoading: false,
    //   }))
      .addMatcher(
        isAnyOf(getCustomerSupportList.pending),
        (state: any) => {
          state.isLoading = true;
        }
      );

    // and provide a default case if no other handlers matched
  },
});

export default customersSupportSlice.reducer;
