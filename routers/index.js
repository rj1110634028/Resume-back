const express = require("express");
const router = express.Router();
// const passportGoogle = require("../config/passportGoogle");
// const passportGithub = require("../config/passportGithub");

const { userController,commentController } = require("../controllers/index");
const tokenAuth=require("../middleware/tokenAuth")
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/success", userController.sociaSignUp);
router.post("/api/signup", userController.signUp);
router.post("/api/login", userController.logIn);
router.post("/api/logout", userController.logOut);

router.use("/api/auth",tokenAuth.userJWT)
router.get("/api/auth/comment", commentController.show);
router.post("/api/auth/comment", commentController.store);
router.put("/api/auth/comment", commentController.update);
router.delete("/api/auth/comment", commentController.delete);

module.exports = router;







// router.get(
//   "/auth/google",
//   passportGoogle.authenticate("google", { scope: ["email", "profile"] })
// );
// router.get(
//   "/auth/google/callback",
//   passportGoogle.authenticate("google", {
//     successRedirect: "/success",
//     failureRedirect: "/login",
//     session: false,
//   })
// );

// router.get(
//   "/auth/github",
//   passportGithub.authenticate("github", { scope: ["user"] })
// );
// router.get(
//   "/auth/github/callback",
//   passportGithub.authenticate("github", {
//     successRedirect: "/success",
//     failureRedirect: "/login",
//     session: false,
//   })
// );