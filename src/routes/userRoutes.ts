import { Router } from "express"
import { fetchUserPosts, fetchUserSecUid } from "../controllers/userController"

const router = Router()

router.get("/:username", fetchUserSecUid)
router.get("/:username/posts", fetchUserPosts)

export default router
