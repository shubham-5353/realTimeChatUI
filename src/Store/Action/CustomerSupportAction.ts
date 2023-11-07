import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../utils/Axios";

export const getCustomerSupportList = createAsyncThunk(
  //slice name , function name (getCustomerList)
  "customerSupport/getCustomerSupportList",
  async (payload: any, { dispatch }) => {
    console.log("payload in customer support", payload);
    const response = await instance.post(
      `customerSupport/?limit=${payload?.rowsPerPage ?? 10}&offset=${
        payload?.offsets ?? 0
      }`,
      payload.data
    );
    console.log("response in customer support", response);
    return response?.data?.data;
  }
);

// export const getVerifiedBy = createAsyncThunk(
//   //slice name , function name (getCustomerList)
//   "customerAnalyst/getVerifiedBy",
//   async (payload: any, { dispatch }) => {
//     const response = await instance.get("getVerifyBy");
//     return response?.data?.data;
//   }
// );

// export const getMyCaseList = createAsyncThunk(
//   //slice name , function name (getCustomerList)
//   "customerAnalyst/getMyCaseList",
//   async (payload: any, { dispatch }) => {
//     const response = await instance.get(`myCases/${payload.id}/?limit=${payload?.rowsPerPage ?? 10}&offset=${payload?.offsets ?? 0}`);
//     console.log("response getMyCaseList", response);
//     return response?.data?.data;
//   }
// );
