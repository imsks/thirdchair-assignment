import { Router } from "express"
import { scrapeAndSave } from "../controllers/scrape"

const router = Router()

router.get("/:videoId", scrapeAndSave)

export default router
