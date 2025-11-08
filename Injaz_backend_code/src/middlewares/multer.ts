/* eslint-disable  */
// middleware/multer.ts
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Change this to your desired upload directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extname = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + extname;
    cb(null, filename);  

  }
});
const fileFilter = (req: any,file: any,cb: any) => {
  if(file.mimetype === "image/jpg"  || 
     file.mimetype ==="image/jpeg"  || 
     file.mimetype ===  "image/png"){
   
  cb(null, true);
 }else{
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
}
}

const upload = multer({ storage: storage , fileFilter : fileFilter});

export default upload;
