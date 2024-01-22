import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiHeader = {
  "Content-Type": "application/json",
};

const createRequest = (url, payload) => ({
  url,
  body: payload,
  method: "POST",
  headers: apiHeader,
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
        headers: apiHeader,
      }),
    }),
    uploadProfile:builder.mutation({
      query:({file,accessToken})=>{
        const formData = new FormData();
      formData.append("profile_picture", file);
        return {
          url: 'profile/',
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        };
      }
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
    getLoggedUserProfile: builder.query({
      query: (id) => {
        return {
          url: `profile-picture/${id}/`,
          method: 'GET',
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

export const { useRegisterUserMutation, useLoginUserMutation,useSendPasswordResetEmailMutation,useResetPasswordMutation, useGetLoggedUserQuery, useUploadProfileMutation, useGetLoggedUserProfileQuery} = userApi;
