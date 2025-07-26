import { Router } from "express"
import { fetchUserPosts, fetchUserSecUid } from "../controllers/user"

const router = Router()

router.get("/:username", fetchUserSecUid)
router.get("/:username/posts", fetchUserPosts)

export default router
