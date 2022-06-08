const express = require("express");
const router = express.Router();
// const passportGoogle = require("../config/passportGoogle");
// const passportGithub = require("../config/passportGithub");

const { userController,commentController,authController } = require("../controllers/index");
const authMiddleware=require("../middleware/authMiddleware")

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// router.get("/success", userController.sociaSignUp);
router.post("/api/signup", authController.signUp);
router.post("/api/login", authController.logIn);
router.post("/api/anonymouslogin", authController.anonymousLogIn);

router.get("/api/comment", commentController.show);
router.use("/api/auth",authMiddleware.checkToken)
router.post("/api/auth/comment", commentController.store);
router.patch("/api/auth/comment/:id", commentController.update);
router.delete("/api/auth/comment/:id", commentController.del);

module.exports = router;