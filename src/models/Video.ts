import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({
    id: String,
    description: String,
    createTime: Number,
    videoUrl: String,
    stats: {
        likes: Number,
        comments: Number,
        shares: Number,
        views: Number
    }
})

export default mongoose.model("Video", videoSchema)
