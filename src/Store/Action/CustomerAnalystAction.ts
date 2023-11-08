import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../utils/Axios";

export const getCustomerAnalystList = createAsyncThunk(
  //slice name , function name (getCustomerList)
  "customerAnalyst/getCustomerAnalystList",
  async (payload: any, { dispatch }) => {
    const response = await instance.post(
      `customerAnalyst/?limit=${payload?.rowsPerPage ?? 10}&offset=${
        payload?.offsets ?? 0
      }`,
      payload.data
    );
    return response?.data?.data;
  }
);

export const getVerifiedBy = createAsyncThunk(
  //slice name , function name (getCustomerList)
  "customerAnalyst/getVerifiedBy",
  async (payload: any, { dispatch }) => {
    const response = await instance.get("getVerifyBy");
    return response?.data?.data;
  }
);

export const getMyCaseList = createAsyncThunk(
  //slice name , function name (getCustomerList)
  "customerAnalyst/getMyCaseList",
  async (payload: any, { dispatch }) => {
    const response = await instance.get(
      `myCases/${payload.id}/?limit=${payload?.rowsPerPage ?? 10}&offset=${
        payload?.offsets ?? 0
      }`
    );
    console.log("response getMyCaseList", response);
    return response?.data?.data;
  }
);

// export const assignCase = createAsyncThunk(
//   //slice name , function name (getCustomerList)
//   "customerAnalyst/assignCase",
//   async (payload: any, { dispatch }) => {
//     console.log("payload assignCase---------", payload);
//     const response = await instance.post("assignCases", payload);
//     console.log("payload assignCase", payload, response);
//     return response?.data?.data;
//   }
// );
