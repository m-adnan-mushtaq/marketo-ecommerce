import { catListTags, provideTagInstance } from "store/actionCreator";
import { apiSlice } from "./apiSlice";

export const extendedCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewCat: builder.mutation({
      query: (body) => ({
        url: "/cats",
        method: "POST",
        body,
      }),
      invalidatesTags:[{type:'Category',id:'LIST'}]
    }),
    updateCat: builder.mutation({
      query: ({ id, body }) => ({
        url: `/cats/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => provideTagInstance(id,'Category'),
    }),
    deleteCat: builder.mutation({
      query: (id) => ({
        url: `/cats/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: catListTags,
    }),
  }),
});

export const {
  useAddNewCatMutation,
  useUpdateCatMutation,
  useDeleteCatMutation,
} = extendedCategoryApiSlice;
