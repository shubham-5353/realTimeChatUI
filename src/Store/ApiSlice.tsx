import { createApi } from "@reduxjs/toolkit/query";
import instance from "../utils/Axios";

export const ApiSlice = createApi({
  reducerPath: "apliSlice",
  baseQuery: instance,
  endpoints: (builder) => ({
    // getAllData: builder.query<any, any>({
    //   query: () => ({
    //     url: "",
    //     method: "",
    //   }),
    // }),
  }),
});






// import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import instance from "../utils/Axios";

// const initialState = {
//   data: [],
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
// };

// const placesTourSlice = createSlice({
//   name: "PlacesTour",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getPlacesTour.pending, (state: any) => {
//         state.isLoading = true;
//       })
//       .addCase(getPlacesTour.fulfilled, (state: any, action: any) => ({
//         ...state,
//         isLoading: false,
//         isSuccess: true,
//         data: action.payload,
//       }))
//       .addCase(getPlacesTour.rejected, (state) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.data = [];
//       });
//     // and provide a default case if no other handlers matched
//   },
// });

// export const getPlacesTour = createAsyncThunk(
//     //slice name , function name (getPlacesTour)
//   "PlacesTour/getPlaceList",
//   async (payload: any, { dispatch }) => {
//     const response = await instance.get("");
//     return response;
//   }
// );

// export default placesTourSlice.reducer;
