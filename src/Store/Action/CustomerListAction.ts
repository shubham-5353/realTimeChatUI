import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../utils/Axios";

export const getCustomerList = createAsyncThunk(
  //slice name , function name (getCustomerList)
  "customersList/getCustomerList",
  async (payload: any, { dispatch }) => {
    console.log("payload getCustomerList---------", payload);
    const response = await instance.post(`customerSearch/?limit=${payload?.rowsPerPage ?? 10}&offset=${payload?.offsets ?? 0}`, payload.data);
    console.log("payload getCustomerList", payload, response);
    return response?.data?.data;
  }
);

export const downloadExcelData = createAsyncThunk(
  //slice name , function name (getCustomerList)
  "customersList/downloadExcelData",
  async (payload: any, { dispatch }) => {
    const response = await instance.get("downloadCustomer");
    return response?.data?.data;
  }
);
