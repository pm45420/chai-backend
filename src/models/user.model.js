import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        unique:true,
        required:true,
        lowercase: true,
        trim:true,
        index: true,
      },
      email :{
        type: String,
        unique:true,
        required:true,
        lowercase: true,
        trim:true,
        
      },
      fullName:{
        type: String,
        required:true,
        trim:true,
        index: true,
      },
      avatar:{
        type:String,//cloudinary url
        required:true,

      },
      coverImage:{
        type:String,//cloudinary url
        
      },
      watchHistory:[
        {
        type: Schema.Types.ObjectId,
        ref:"Video"
        }

      ],
      password:{
        type:String,
        required:[true,'Password is required']
      },
      refreshToken:{
        type: String
      },
      

      

},{timestamps:true})

/*if(this.isModified("password")) {
userSchema.pre("save",async function (next)
{
  this.pasword=bcrypt.hash(this.password,10)
  next()
} )
}
return next();
*/
//OR

userSchema.pre("save",async function (next)
{
  if(!this.isModified("password"))
    {return next();}
  this.password= await bcrypt.hash(this.password,10)
  next()
} ) 
//injecting custom funtion
userSchema.methods.isPasswordCorrect=async function(password){
  return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){

  return jwt.sign(
{
  _id: this._id,
  email: this.email,
  username: this.username,
  fullName: this.fullName
},
process.env.ACCESS_TOKEN_SECRET,
{
  expiresIn: process.env.ACCESS_TOCKEN_EXPIRY
}
)

}
userSchema.methods.generateRefreshToken=function(){
  return jwt.sign(
    {
      _id: this._id,
     // email: this.email,
     // username: this.username,// qki refresh token baar baar refresh hota rahta hai to kewal _id hi rakha hai ismein
     // fullName: this.fullName
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOCKEN_EXPIRY
    }
    )
}

 
export const User= mongoose.model("User",userSchema);