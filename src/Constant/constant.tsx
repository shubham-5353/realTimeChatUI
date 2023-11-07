// export const BASE_URL = "https://nodeapi.salaryday.in/api";
// export const BASE_URL = "http://43.205.135.13:3000/api/"
export const BASE_URL =
  "https://bfef-2405-201-303b-70b3-119d-95c-2f73-fd0f.ngrok.io/api";
export const regex = {
  mobileNo: `/^\d{10}$/`,
  // email:`^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`,
  email: `/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/`,
  // email:`/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`,
  panNo: ` /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/`,
};
