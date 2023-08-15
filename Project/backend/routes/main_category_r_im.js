const router=require("express").Router();
const main_category_c=require("../controller/main_category_c_im");
const multer = require("multer");
const path = require("path");


router.post("/add_new_main_category",main_category_c.add_main_category);
router.get("/get_main_category",main_category_c.getMainCategory);
router.put("/update_main_category/:id",main_category_c.updateMainCategory);
router.delete("/delete_main_category/:id",main_category_c.deleteMainCategory);
router.get("/get_one_main_category/:id",main_category_c.getOneMainCategory);
router.get("/search_main_category/:key",main_category_c.searchMainCategory);


//category icon upload

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/categoryicon/"));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });

 router.post("/upload", upload.single("image"), (req, res, next) => {
    return res.json({
      path: `/categoryicon/${req.file.filename}`
    });
  });


module.exports=router;