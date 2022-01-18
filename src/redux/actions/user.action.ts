import { createAsyncThunk } from '@reduxjs/toolkit'
// import API from "@services/apiService";

// export const userGetMe = createAsyncThunk(
//   "catalogs/request",
//   async (_, { getState }) => {
//     const {user} = getState();
//     const rsp = await API.get(`https://catalogEndpointBase/${catalogName}`, {
//       headers: {
//         Authorization: `Bearer ${state.user.accessToken}`,
//         "Content-Type": "application/json"
//       }
//     });
//     return {
//       data: rsp.data,
//       catalogName
//     };
//   }
// );
