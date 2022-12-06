import {
  findPaginatedProducts,
  prepareFilterHelper,
} from "../utils/pagination.js";
import Product from "../models/Product.js";
import { upload } from "../config/multer.js";

// get all products handler all with filtered and paginated
async function getAllProductHandler(req, res) {
  try {
    const limit = 3;
    const { queryObj, page } = await prepareFilterHelper(req.query);
    // console.log(req.query);
    // find products and paginate
    const foundProducts = await findPaginatedProducts(limit, queryObj, page);

    res.json(foundProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
}

// get all products handler all with filtered and paginated
async function getAllAdminProducts(req, res) {
  try {
    const limit = 2;
    const id = req.params.id;
    if (!id) throw Error("No Admin id found!");
    const { queryObj, page } = await prepareFilterHelper(req.query, id);
    // console.log(queryObj);
    // find products and paginate
    const foundProducts = await findPaginatedProducts(limit, queryObj, page);

    res.json(foundProducts);
  } catch (error) {
    console.error(error);
    res.status(401).json({
      error: error.message,
      success: false,
    });
  }
}

// create new product
function createProductHandler(req, res) {
  upload(req, res, async (err) => {
    try {
      // get file
      const image = req.file;
      if (!image) throw Error("File not Found!");
      const { title, category, price } = req.body;
      // console.log(req.body);
      if (![title, category, price].every(Boolean)) throw Error("Invalid Credentials");
      const { _id } = await Product.create({
        title,
        category,
        imageType: image.mimetype,
        image: image.buffer,
        price: parseFloat(price),
        createdBy: req.user._id,
      });
      res.status(201).json({
        success: true,
        id: _id
      });
    } catch (error) {
      console.error(error.message);
      res.status(400).json({
        error: error.message,
        success: false,
      });
    }
  });
}

async function updateProductHandler(req, res) {
  try {
    // get file
    const { id } = req.params;
    if (!id) throw Error("Invalid Credentials");
    const product = await Product.findOneAndUpdate(
      {
        _id: id,
      },
      req.body
    ).exec();
    res.status(201).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      error: error.message,
      success: false,
    });
  }
}

async function deleteProductHandler(req, res) {
  try {
    const { id } = req.params;
    if (!id) throw Error("Invalid Credentials");
    const delFeedBack = await Product.findByIdAndRemove(id).exec();
    // console.log(delFeedBack);

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      error: error.message,
    });
  }
}

export {
  getAllProductHandler,
  createProductHandler,
  deleteProductHandler,
  updateProductHandler,
  getAllAdminProducts,
};
