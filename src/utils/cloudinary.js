import {v2 as cloudinary} from "cloudinary" 
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath)=> {
    try {
        if (!localFilePath) return null 
        //upload the file on cloudianry
        const response= await cloudinary.uploader.upload(localFilePath,{ resource_type:"auto"})
        
        //file has been uploaded successfully 
       //console.log("file is uploaded on cloudinary",response.url);
      //fs.unlinkSync(localFilePath)

        // Delete the file locally only if it exists
       // if (fs.existsSync(localFilePath)) {
        //    fs.unlinkSync(localFilePath);
       // }
        return response;
    } 
   catch (error){
 //  if (fs.existsSync(localFilePath)) 
   // {
    //    try 
    //    {
        
            fs.unlinkSync(localFilePath)
      //  }
      //  catch (deleteError)
       //  {
       //     console.error("Error deleting local file:", deleteError);
       //  }
    
        //fs.unlinkSync(localFilePath)//remove the locally saved remporary file as the, 
        //,upload operation got failed 
    
        return null;

    }

}
 
export {uploadOnCloudinary}