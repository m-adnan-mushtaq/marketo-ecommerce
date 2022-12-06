import {  prepareProductUrlHelper, providesListTags, providesPartialListTags, transformProductResponse } from "store/actionCreator";
import { extractExtrasFromProduct } from "utils/util";
import { apiSlice } from "./apiSlice";


export const extendedStoreApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getHomePageDate:builder.query({
            query:()=>'/',
            providesTags:(result,error,args)=>(
                result?(
                    [
                        ...result?.hotProducts.map(({_id})=>({type:'Product',id:_id})),
                        ...result?.topProducts.map(({_id})=>({type:'Product',id:_id})),
                        ...result?.randomCats.map(({_id})=>({type:'Category',id:_id})),
                    ]
                ):['Product','Category']
            ),
            transformResponse:(response)=>{
                response.hotProducts=response.hotProducts.map(extractExtrasFromProduct)
                response.topProducts=response.topProducts.map(extractExtrasFromProduct)
                return response
            }
        }),
        getAllCats:builder.query({
            query:()=>'/cats',
            providesTags:(result,error,args)=>providesListTags(result,'Category')
        }),
        getPaginatedProducts:builder.query({
            query:(args)=>prepareProductUrlHelper('/products',args),
            providesTags: (result, error, args) =>providesPartialListTags(result?.products,'Product'),
            transformResponse:transformProductResponse  
        })
    })
})

export const {useGetHomePageDateQuery,useGetAllCatsQuery,useGetPaginatedProductsQuery} = extendedStoreApiSlice