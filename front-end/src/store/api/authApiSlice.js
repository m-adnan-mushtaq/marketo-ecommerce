import { toast } from "react-toastify";
import { emptyCart, removeUserCredentials, setUserCredentials } from "store/actionCreator";
import { apiSlice } from "./apiSlice";

// fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(body)`
export const extendedAuthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        url: `/auth/sign-up`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [{type:"User",id:"LIST"}],
    }),
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: credentials,
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const result = await queryFulfilled;
          let token = getState().auth?.token;
          // console.log(result);
          dispatch(
            setUserCredentials({
              token,
              user: result,
            })
          );
        } catch (error) {
          console.log(error.message);
        }
      },
      invalidatesTags: (response, error, { id }) => [{ type: "User", id }],
    }),
    deleteProfile: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        try {
          //check if user is deleting his own profile
          await queryFulfilled;
          let loggedUserId = getState()?.auth?.user._id;
          if (loggedUserId === id) {
            //then logout current user
            dispatch(removeUserCredentials());
            localStorage.removeItem("persist");
            dispatch(emptyCart())
          }
        } catch (error) {
          console.error(error.message);
        }
      },
      invalidatesTags: (response, error, id) => [{ type: "User", id:"LIST" }],


    }),
    logOut: builder.query({
      query: () => ({
        url: `/auth/logout`,
        credentials: "include",
      }),
      // The 2nd parameter is the destructured `QueryLifecycleApi`
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // console.log('logout request completed!');
          dispatch(removeUserCredentials());
          dispatch(emptyCart())
          localStorage.removeItem("persist");
        } catch (error) {
          // console.error(error)
        }
      },
    }),
    getrefreshToken: builder.query({
      query: () => ({
        url: `/auth/refresh`,
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          //get credentials
          const refreshResult = await queryFulfilled;
          if (refreshResult?.data?.accessToken) {
            dispatch(
              setUserCredentials({
                user: refreshResult.data.user,
                token: refreshResult.data.accessToken,
              })
            );
            localStorage.setItem("persist", true);
          }
        } catch (error) {
          toast.error("Something Went Wrong!");
        }
      },

    }),
  }),
});

//hooks
export const {
  useSignInMutation,
  useSignUpMutation,
  useUpdateProfileMutation,
  useLogOutQuery,
  useGetrefreshTokenQuery,
  useDeleteProfileMutation
} = extendedAuthApiSlice;
