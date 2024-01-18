import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiHeader = {
  "Content-Type": "application/json",
};

const createRequest = (url, payload) => ({
  url,
  body: payload,
  method: "POST",
  Headers: apiHeader,
});

// Define a sevice using a base URL and expected endpoints

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/users/" }),
  endpoints: (builder) => ({
    // register or signup endpoints
    registerUser: builder.mutation({
      query: (payload) => createRequest("signup/", payload),
    }),

    // login endpoints
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "login/",
        method: "POST",
        body: payload,
        Headers: apiHeader,
      }),
    }),
    uploadProfile:builder.mutation({
      query:(file)=>createRequest('profile/',{image: file}),
    }),
    getLoggedUser: builder.query({
      query: (access_token) => {
        return {
          url: 'profile/',
          method: 'GET',
          headers: {
            'authorization': `Bearer ${access_token}`,
          }
        }
      }
    }),
    sendPasswordResetEmail: builder.mutation({
        query: (user) => {
          return {
            url: 'request-password-reset/',
            method: 'POST',
            body: user,
            headers: {
              'Content-type': 'application/json',
            }
          }
        }
      }),
      resetPassword: builder.mutation({
        query: ({ password,confirmPassword, id, token }) => {
          return {
            url: `/reset-password/${id}/${token}/`,
            method: 'POST',
            body: {password,confirmPassword},
            headers: {
              'Content-type': 'application/json',
            }
          }
        }
      }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation,useSendPasswordResetEmailMutation,useResetPasswordMutation, useGetLoggedUserQuery } = userApi;
