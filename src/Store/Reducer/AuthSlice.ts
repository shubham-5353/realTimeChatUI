import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loginUser } from "../Action/AuthAction";

const AuthSlice = createSlice({
  name: "authentication",
  initialState: {
    userDetails: {},
    isSuccess: false,
    isError: false,
    errorMessage: {},
    // downloadDataList: [],
    isLoading: false,
  },
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loginUser.fulfilled, (state: any, action: any) => ({
  //       ...state,
  //       userDetails: action.payload?.data,
  //       isSuccess: true,
  //       isLoading: false,
  //     }))
  //     .addCase(loginUser.rejected, (state: any, action: any) => ({
  //       ...state,
  //       isError: true,
  //       errorMessage: action.payload,
  //       isLoading: false,
  //     }))
  //     .addMatcher(isAnyOf(loginUser.pending), (state: any) => {
  //       state.isLoading = true;
  //     });

  //   // and provide a default case if no other handlers matched
  // },

  extraReducers: {
    [loginUser.pending]: (state: any, action: any) => {
      console.log("loginUser pending ---");
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state: any, action: any) => {
      // if (action.message) {
      //   state.isError = true;
      //   state.errorMessage = action.error;
      // } else {
      state.userDetails = action.payload;
      state.isSuccess = true;
      // }
      state.isLoading = false;
      console.log("loginUser fulfilled ---", action);
    },
    // [loginUser.rejected]: (state: any, action: any) => {
    //   state.isError = true;
    //   state.errorMessage = action.error;
    //   state.isLoading = false;
    //   console.log("loginUser rejected ---", action);
    // },
  },
});

export default AuthSlice.reducer;
