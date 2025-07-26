import { Request, Response } from "express"
import { fetchVideoDetails } from "../services/fetchVideo"
import Video from "../models/Video"

export const scrapeAndSave = async (req: Request, res: Response) => {
    const { videoId } = req.params

    try {
        const data = await fetchVideoDetails(videoId)

        const item = data.itemInfo.itemStruct

        const video = new Video({
            id: item.id,
            description: item.desc,
            createTime: item.createTime,
            videoUrl: item.video?.playAddr,
            stats: {
                likes: item.stats?.diggCount,
                comments: item.stats?.commentCount,
                shares: item.stats?.shareCount,
                views: item.stats?.playCount
            }
        })

        await video.save()
        res.status(200).json({ message: "Video saved successfully!", video })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to scrape and save video" })
    }
}
