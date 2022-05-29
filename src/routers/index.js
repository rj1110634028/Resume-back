const express = require("express");
const router = express.Router();
// const passportGoogle = require("../config/passportGoogle");
// const passportGithub = require("../config/passportGithub");

const { userController,commentController,authController } = require("../controllers/index");
// const tokenAuth=require("../middleware/tokenAuth")
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// router.get("/success", userController.sociaSignUp);
router.post("/api/signup", authController.signUp);
router.post("/api/login", authController.logIn);

// router.use("/api/auth",tokenAuth.userJWT)
router.get("/api/comment", commentController.show);
router.post("/api/auth/comment", commentController.store);
router.put("/api/auth/comment", commentController.update);
router.delete("/api/auth/comment", commentController.del);

module.exports = router;