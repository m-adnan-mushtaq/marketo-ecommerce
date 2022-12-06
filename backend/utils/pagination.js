import { isValidObjectId } from "mongoose";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const productPopulateOptions = [
  {
    path: "category",
    model: "Category",
  },
  {
    path: "createdBy",
    model: "User",
  },
];

/**
 *
 * @param {Number} limit
 * @param {Object} filter
 * @param {Number} page
 */
async function findPaginatedProducts(limit, filter, page) {
  try {
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let productsObj = {};

    // prevpage info
    if (startIndex > 1) {
      productsObj.previous = page - 1;
    }

    // calcualte the total count
    const count = await Product.countDocuments(filter).exec();
    // get the specific Products
    const foundProducts = await Product.find(filter)
      .limit(limit)
      .skip(startIndex)
      .populate(productPopulateOptions)
      .sort({
        createdAt: -1,
      })
      .exec();
    if (endIndex < count) {
      productsObj.next = page + 1;
    }
    // get the total no of page
    productsObj.total_pages = Math.ceil(count / limit);
    productsObj.products = foundProducts;
    productsObj.current_page = page;
    productsObj.totalProducts = count;
    productsObj.countIndex = startIndex;
    return productsObj;
  } catch (error) {
    throw new Error(error);
  }
}


// prepare product filters helper function
/**
 * function that prepares quer filters for products to filter out
 * @param {Object} query query object recieved with req.query 
 * @param {String} id  id of current user if available
 */
async function prepareFilterHelper(query, id = undefined) {
  try {
    let queryObj = {}
    let { category, page, search } = query
    if (category && isValidObjectId(category)) {
      queryObj.category = category
    }
    if (search && search.trim()) {
      queryObj.title = new RegExp(search.trim(), 'igm')
    }
    if (id && isValidObjectId(id)) {
      // try grabing user id
      const foundUser = await User.findById(id).orFail('No Such User exists!')
      // check for it's roles
      if(foundUser.role === 'ADMIN' || foundUser.role == 'SUPERADMIN'){
        queryObj.createdBy=foundUser._id
      }
    }
    page = parseInt(page) || 1
    return { queryObj, page }
  } catch (error) {
    throw Error(error)
  }

}
export { findPaginatedProducts, prepareFilterHelper };
