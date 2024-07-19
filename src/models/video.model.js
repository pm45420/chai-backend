import mongoose, {Schema} from "mongoose";
import mongooseAggregatePeginate from "mongoose-aggregate-peginate-v2";

const videoSchema= new mongoose.Schema({
    videoFlile:{
        type:String, //cloudinary url
        required:true
    },
    thumbnail:{
        type : String, //cloudinary url
        required: true
    },
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
   views:{
        type:Number,
        required:true
    },
    isPublished:{
        type:Boolean,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }


},{timestamps:true})

videoSchema.plugin(mongooseAggregatePeginate)

export const Video= mongoose.model("User",videoSchema);