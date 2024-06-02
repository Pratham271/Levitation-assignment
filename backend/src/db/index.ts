import mongoose from "mongoose";

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING!)
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
        minLength: 6,
        maxLength: 16
    }
})

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    productName : {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    validity: {
        type: Date,
        default: function() {
            const currentDate = new Date();
            const nextYearDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
            return nextYearDate;
        }
    },
    

},{ timestamps: true })

export const User = mongoose.model("user", userSchema)
export const Cart = mongoose.model("cart", cartSchema)

