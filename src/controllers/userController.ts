import { Request, Response } from "express"
import { getAllPosts, getSecUid } from "../services/tiktokService"
import Video from "../models/Video"

export const fetchUserSecUid = async (req: Request, res: Response) => {
    const { username } = req.params
    try {
        const secUid = await getSecUid(username)
        res.json({ username, secUid })
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch secUid" })
    }
}

export const fetchUserPosts = async (req: Request, res: Response) => {
    const { username } = req.params
    console.log("username", username)

    try {
        const secUid = await getSecUid(username)
        console.log("secUid", secUid)
        if (!secUid)
            return res
                .status(404)
                .json({ message: "User not found or secUid missing" })

        let cursor = 0
        let hasMore = true
        let savedCount = 0

        while (hasMore) {
            const data = await getAllPosts(secUid, 5, cursor)
            const items = data?.data?.items || []

            for (const item of items) {
                console.log(item)
                const existing = await Video.findOne({ id: item.id })
                if (!existing) {
                    await Video.create({
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
                    savedCount++
                }
            }

            hasMore = data.data?.hasMore
            cursor = data.data?.cursor
        }

        res.json({ message: `✅ Fetched and saved ${savedCount} videos.` })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to fetch user posts" })
    }
}
