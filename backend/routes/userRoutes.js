const express = require("express");
const multer = require("multer");
const {
  addUser,
  getUsers,
  deleteUser,
  bulkAddUsers,
} = require("../controllers/userController");
const router = express.Router();
router.get("/", getUsers);

router.post("/", addUser);

router.delete("/:id", deleteUser);
const upload = multer({ storage: multer.memoryStorage() });
router.post("/bulk", upload.single("file"), bulkAddUsers);

module.exports = router;
