const router=require("express").Router();
const user_c=require("../controller/user_c_im");
const multer = require("multer");
const path = require("path");



router.post("/add_user",user_c.add_user);
router.get("/get_user",user_c.get_user);
router.put("/update_user/:id",user_c.update_user);
router.delete("/delete_user/:id",user_c.delete_user);
router.get("/get_one_user/:id",user_c.get_one_user);
router.get("/get_one_user_id/:ucode",user_c.get_one_user_id);
router.get("/search_user_im/:key",user_c.search_user_im);
router.put("/update_user_id/:ucode",user_c.update_user_id);

//product image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/productimages/"));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  router.post("/upload", upload.single("image"), (req, res, next) => {
    return res.json({
      path: `/productimages/${req.file.filename}`
    });
  });





module.exports=router;