import {fetchBaseQuery , createApi} from "@reduxjs/toolkit/query/react"
import { removeUserCredentials, setUserCredentials } from "store/actionCreator"


//base url
const baseQuery=fetchBaseQuery({
    baseUrl:'http://localhost:5000/api',
    prepareHeaders:(headers,{getState})=>{
      const token= getState().auth.token
      if(token){
        headers.set('Authorization',`Bearer ${token}`)
      }
      return headers
    },
    credentials:'include' ,// allowing to send cookies
})



const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error &&  result.error.status === 403) {
      // console.log('sending refresh token....');
      // try to get a new token
      const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
      if (refreshResult.data) {
        // store the new token
        const {user,accessToken}=refreshResult.data
        api.dispatch(setUserCredentials({
            user,
            token:accessToken
        }))
        localStorage.setItem('persist',true)
        // retry the initial query
        result = await baseQuery(args, api, extraOptions)
      } else {
        api.dispatch(removeUserCredentials())
      }
    }
    return result
  }


export const apiSlice=createApi({
    reducerPath:'api',
    baseQuery:baseQueryWithReauth,
    endpoints:builder=>({}),
    tagTypes:['Category','Product','User'],
})

  /*
Reference https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery
 */