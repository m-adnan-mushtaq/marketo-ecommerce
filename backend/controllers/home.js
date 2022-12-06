import Category from "../models/Category.js"
import Product from "../models/Product.js"
import { productPopulateOptions } from "../utils/pagination.js"


export async function getHomePageData(req, res) {
    {
        try {
            const agregationPipleline=[
                {
                    $sample:{size:3}
                }
            ]
            // select three random category
            let randomCats = await Category.aggregate(agregationPipleline)
            // select one random category and show it's all products
            const topProducts = await Product.find({category:randomCats[0]?._id}).populate(productPopulateOptions).exec()
            // select 3 random products
            let hotProducts = await Product.aggregate(
                [
                    {
                        $sample:{size:3}
                    },
                    // {
                    //     $lookup: {
                    //       localField: 'category',
                    //       foreignField: '_id',
                    //       from: 'categories',
                    //       as: 'category',
                    //     }
                    //   },
                    //   {
                    //     $unwind: '$category'
                    //   }
                ]
            )
            hotProducts= await Promise.all(hotProducts.map(async doc=>{
                doc= Product.hydrate(doc)
                doc = await doc.populate(productPopulateOptions)
                return doc
            }))
            console.log('request made');
            console.log(hotProducts.length);
            res.status(200).json({
                randomCats,
                topProducts,
                hotProducts
            })
        } catch (error) {
            console.error(error.message)
            res.status(500).json({
                error: error.message
            })
        }
    }
}


