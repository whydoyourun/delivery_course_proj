const Router = require("express");
const router = new Router();
const authCheckMiddleware = require("../middleware/AuthCheckMiddleware");

const userController = require("../controllers/userController");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/sendRecoveryCode", userController.sendRecoveryCode);
router.post("/verifyRecoveryCode", userController.verifyRecoveryCode);
router.post("/updatePassword", userController.updatePassword);
router.post(
  "/updateUserData",
  authCheckMiddleware,
  userController.updateUserData
);
router.get("/auth", authCheckMiddleware, userController.check);
router.get("/me", authCheckMiddleware, userController.getUserById);
router.delete("/");

module.exports = router;
