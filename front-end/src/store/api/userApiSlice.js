import { providesListTags, provideTagInstance } from "store/actionCreator";
import { apiSlice } from "./apiSlice";

export const extendedUserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers:builder.query({
        query:()=>'/super-admin/users',
        providesTags:(response,error,args)=>providesListTags(response,'User')
    }),
    updateUserRole:builder.mutation({
        query:({id,body})=>({
            url:`/super-admin/update-role/${id}`,
            method:'PATCH',
            body
        }),
        invalidatesTags:(result,error,{id})=>provideTagInstance(id,'User')
    })
  }),
});

export const {
    useGetUsersQuery,
    useUpdateUserRoleMutation
} = extendedUserApiSlice;
