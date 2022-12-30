const router = require("express").Router(); // Le Routeur de express
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require('multer');
const upload = multer();

// authentification
router.post("/register", authController.signUp); // On déclanche dans le dossier authController la fonction signUp
router.post("/login", authController.signIn); // On déclanche dans le dossier authController la fonction signIn
router.get("/logout", authController.logout); // On déclanche dans le dossier authController la fonction logout


router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);


module.exports = router;
