import { Router } from "express"
import { scrapeAndSave } from "../controllers/scrapeController"

const router = Router()

router.get("/:videoId", scrapeAndSave)

export default router
