import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../utils/Axios";

export const loginUser: any = createAsyncThunk(
  "authentication/loginUser",
  async (payload: any, { dispatch }) => {
    try {
      const response = await instance.post(`users/loginUser`, payload);
      return response.data;
    } catch (err: any) {
      console.log("err loginUser", err);
      return err.response.data.message;
    }
  }
);

// export const downloadExcelData = createAsyncThunk(
//   //slice name , function name (getCustomerList)
//   "authentication/downloadExcelData",
//   async (payload: any, { dispatch }) => {
//     const response = await instance.get("downloadCustomer");
//     return response?.data?.data;
//   }
// );
