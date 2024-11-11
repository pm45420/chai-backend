import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler( async (req,res)=>{
   //get user details from frontend
   //validation-not empty
   //check if user already exists:username,email
   //check for images,check for avatars
   //create user object-create entry in db
   //remove password and refresh token field from response
   //check for user creation
   //return response

   //get user details from frontend
   const { fullName,email,userName,password}=req.body
   console.log("email:",email);
   
   // validation check-empty field validation
   
   if([fullName,email,userName,password].some((field)=>field?.trim()===""))

     { throw new ApiError(400,"All fields are required") }
     //checking if user already exists:username,email

       const existedUser= await User.findOne({
      $or: [{ userName },{ email }]
     })

     if(existedUser){
      throw new ApiError(409,"User with eamil or username already exists")
     }
     //check for images,check for avatars
     const avatarLocalPath=req.files?.avatar[0]?.path;  
     //const avatarLocalPath=req.files?.avatar?.[0]?.path;   
     const coverImageLocalPath= req.files?.avatar[0]?.path;
     //const coverImageLocalPath = req?.files?.coverImage?.[0]?.path;

  if(!avatarLocalPath)
  {throw new ApiError(400,"AvatarPath is required")}
  const avatar= await uploadOnCloudinary(avatarLocalPath)
  const coverImage= uploadOnCloudinary(coverImageLocalPath)
//avatar check kar lo ki upload hua hai ya nahi warna database phatega
if(!avatar)
  {throw new ApiError(400,"Avatar is required")}

//create user object-create entry in db
const user = await User.create({
  fullName,
  avatar: avatar.url,
  coverImage: coverImage?.url || "",
  email,
  password,
  username: userName.toLowerCase(),
 })
 // user create hua hai ya nahi ye check karne ke liye
 const createdUser= await User.findById(user._id).select("-password -refreshToken")
                              // remove password and refresh token field from response  
                              
// check for user creation
if(!createdUser) 
  { throw new ApiError(500,"Something went wrong while registering the user")}  
 
return res.status(201).json(
  new ApiResponse(200, createdUser,"User registered successfully")
)
 
})
 
export {registerUser};