import {  prepareProductUrlHelper, productPartialTags, providesPartialListTags, provideTagInstance, transformProductResponse } from "store/actionCreator";
import { apiSlice } from "./apiSlice";

export const extendedProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminProducts:builder.query({
      query:({id,...args})=>prepareProductUrlHelper(`/products/admin/${id}`,args),
      providesTags: (result, error, args) =>providesPartialListTags(result?.products,'Product'),
      transformResponse:transformProductResponse
    }),
    addNewProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags:productPartialTags
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => provideTagInstance(id,'Product'),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: productPartialTags,
    }),
  }),
});

export const {
    useGetAdminProductsQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = extendedProductApiSlice;
