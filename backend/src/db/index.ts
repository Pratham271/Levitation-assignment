import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
mongoose.connect("")
.then(()=> console.log("connected to mongoose"))
.catch((e) => console.log(e))

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
    ,
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const cartProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    }
})

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: [cartProductSchema],
    validity: {
        type: String,
        required: true
    },
    

},{ timestamps: true })


const tempCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: [cartProductSchema],
    validity: {
        type: String,
        required: true
    },
})

export const User = mongoose.model("user", userSchema)
export const Cart = mongoose.model("cart", cartSchema)
export const Product = mongoose.model("product", productSchema)
export const TempCart = mongoose.model("tempCart", tempCartSchema)

