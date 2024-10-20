const Router = require("express");
const router = new Router();
const roleCheck = require("../middleware/RoleCheckMiddleware");

const menuController = require("../controllers/menuItemController");

router.post("/add", roleCheck("ADMIN"), menuController.add);
router.get("/", menuController.getSorted);
router.get("/:id", menuController.getById);
//router.delete("/:id", menuController.delete);

module.exports = router;
