import axios from "axios";
import { Types } from "mongoose";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

//axios config
const apiInstance = axios.create({
    baseURL: "https://api.storerestapi.com",
    withCredentials: true,
    timeoutErrorMessage: "Check you network , You are runing on a slow device",
    timeout: 4000,
});

async function fetchCategoires(req, res) {
    try {
        // fetch all categories
        const { data: categories } = await apiInstance.get("/categories");
        console.log(categories.data.length);
        const fetchedCategories = categories?.data;
        if (!fetchedCategories ) throw Error("Something Went Wrong!");
        //save fetched categories to the database
         await Category.insertMany(
            fetchedCategories.map((cat) => (
                {
                    _id: Types.ObjectId(cat._id),
                    name: cat.name
                }
            ))
        );

        res.status(201).json({ success: true, mesage:'Data inserted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: error.message,
        });
    }
}

async function fetchProducts(req, res) {
    try {
        const { data: products } = await apiInstance.get("/products");
        console.log(products.data.length);
        const fetchedproducts = products?.data;
        if (!fetchedproducts ) throw Error("Something Went Wrong!");
        //save fetched products to the database
        await Product.insertMany(
            fetchedproducts.map((product) => (
                {
                    _id: Types.ObjectId(product._id),
                    title:product.title,
                    category:product.category?._id,
                    createdBy:product.createdBy?._id
                }
            ))
        );

        res.json({ success: true, mesage:'Data inserted successfully!'});
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: error.message,
        });
    }
}

export { fetchCategoires, fetchProducts };
