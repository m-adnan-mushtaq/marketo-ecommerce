import axios from "axios";
import { Types } from "mongoose";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

//axios config
const apiInstance = axios.create({
    baseURL: "https://fakestoreapi.com",
    withCredentials: true,
    timeoutErrorMessage: "Check you network , You are runing on a slow device",
    timeout: 4000,
});

async function fetchCategoires(req, res) {
    try {
        // fetch all categories
        const { data: categories } = await apiInstance.get("/products/categories");
        if (!categories ) throw Error("Something Went Wrong!");
        //save fetched categories to the database
         await Category.insertMany(
            categories.map((cat) => (
                {
                    name: cat
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
        const { data: fetchedproducts } = await apiInstance.get("/products");
        if (!fetchedproducts ) throw Error("Something Went Wrong!");
        //save fetched products to the database
        const insertedProducts=await Product.insertMany(
            await Promise.all(fetchedproducts.map(async (product) => {
                const category=await pickIdFromCatDoc(product.category)
                return {
                    _id: Types.ObjectId(product._id),
                    title:product.title,
                    category,
                    price:parseFloat(product.price),
                    imgUrl:product?.image

                }
            })
        ));

        res.json({ success: true, mesage:'Data inserted successfully!',insertedProducts});
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: error.message,
        });
    }
}


async function pickIdFromCatDoc(catName) {
    try {
        const cats=await Category.find()
        let targetCat=cats.find(cat=>cat.name == catName )
        return targetCat._id
    } catch (error) {
        throw Error(error)
    }
}

export { fetchCategoires, fetchProducts };
