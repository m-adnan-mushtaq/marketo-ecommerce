import { createAction } from "@reduxjs/toolkit"
import { extractExtrasFromProduct } from "utils/util"

//------ auth state actions creator--------------
export const setUserCredentials = createAction('auth/setUserCredentials')
export const removeUserCredentials = createAction('auth/removeUserCredentials')


// cart state action creator------------------
export const addToCart = createAction('cart/addToCart')
export const removeFromCart = createAction('cart/removeFromCart')



//-------- common store helper functions and arrays----------------------
export const catListTags= [{ type: "Category", id: "LIST" }]
export const productPartialTags=[{type:"Product",id:"PARTIAL-LIST"}]


export const provideTagInstance=(id,tagType)=>[{type:tagType,id}]

/**
 * function for preparting tags for cahce for bulk query result
 * @param {Array} resultWithIds array of objects contains id's
 * @param {*} tagType  tag type for cache update
 * @returns {Array}
 */
export const providesPartialListTags = (resultWithIds, tagType)=> (
    resultWithIds
        ? [
            { type: tagType, id: "PARTIAL-LIST" },
            ...resultWithIds.map(({ _id }) => ({
                type: tagType,
                id: _id,
            })),
        ]
        : [{ type: tagType, id: "PARTIAL-LIST" }]
)

/**
 * function for preparting tags for cahce for pagination query result
 * @param {Array} resultWithIds array of objects contains id's
 * @param {*} tagType  tag type for cache update
 * @returns {Array}
 */
export const providesListTags = (resultWithIds, tagType) =>(
    resultWithIds
        ? [
            { type: tagType, id: "LIST" },
            ...resultWithIds.map(({ _id }) => ({
                type: tagType,
                id: _id,
            })),
        ]
        : [{ type: tagType, id: "LIST" }]
)


export const prepareProductUrlHelper=(url,args)=>{
    const {page,category,search} = args
    if (page) url += `?page=${page || 1}`;
    if (search) url += `&search=${search.trim()}`;
    if (category) url += `&category=${category}`;
    return {url};
}


export const transformProductResponse=(response)=>{
    response.products= response.products.map(extractExtrasFromProduct)
    return response
}