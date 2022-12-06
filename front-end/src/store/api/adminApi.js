import { providesListTags } from "store/actionCreator";
import { apiSlice } from "./apiSlice";


export const extendedAdminApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getDashboardData:builder.query({
            query:()=>'/admin/overview',
            providesTags:[{type:'Category',id:'LIST'},{type:'Product',id:'PARTIAL-LIST'}]
        }),
        getAdminCats:builder.query({
            query:(id)=>`/cats/admin/${id}`,
            providesTags:(result,error,args)=>providesListTags(result,'Category')
        })
    })
})

export const {useGetAdminCatsQuery,useGetDashboardDataQuery} = extendedAdminApiSlice