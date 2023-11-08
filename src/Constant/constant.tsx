export const BASE_URL = "http://localhost:3000/api";
export const IMAGE_BASE_URL = "http://localhost:3000";
export const regex = {
  mobileNo: `/^\d{10}$/`,
  // email:`^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`,
  email: `/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/`,
  // email:`/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`,
  panNo: ` /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/`,
};
