import "./config/config.js"
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
//connect mongoose
mongoose.connect(process.env.MONGO_URI).then(()=>console.log('MongoDB is connected!')).catch(e=>{
    process.nextTick(() => {
        throw Error(e)
    })
})
//-------------------- express setup---------------
const app = express()
const port = process.env.PORT || 5000
app.use(cors({
    origin: [process.env.LOCAL_FRONT_END_URL],
    credentials: true,
}))
app.use(express.json({ limit: '15mb' }))
app.use(cookieParser(process.env.COOKIE_SECRET))
//---------------------------- api routes----------------------------
import homeRoutes from "./routes/home.js"
import authRoutes  from "./routes/auth.js"
import getDataRoutes  from "./routes/getData.js"
import categoiresRoutes from "./routes/categories.js"
import productRoutes from "./routes/products.js"
import userRoutes from "./routes/users.js"
import adminRoutes from "./routes/admin.js"
import superAdminRoutes from "./routes/super-admin.js"

// --------@/api/---------------
app.use('/api/',homeRoutes)

//--------@/api/auth---------------
app.use('/api/auth', authRoutes)

//--------- @api/get-data---------
app.use('/api/get-data',getDataRoutes)

//----------@api/cats------------
app.use('/api/cats',categoiresRoutes)

//----------@api/products------------
app.use('/api/products',productRoutes)

//----------@api/users------------
app.use('/api/users',userRoutes)

//----------@api/admin------------
app.use('/api/admin',adminRoutes)

//----------@api/super-admin------------
app.use('/api/super-admin',superAdminRoutes)

//listening server
app.listen(port, () => console.log(`Server is runing on ${port}`))