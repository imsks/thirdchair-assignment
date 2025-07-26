import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

export async function fetchVideoDetails(videoId: string) {
    const options = {
        method: "GET",
        url: `https://${process.env.RAPIDAPI_HOST}/api/post/detail`,
        params: { videoId },
        headers: {
            "x-rapidapi-host": process.env.RAPIDAPI_HOST!,
            "x-rapidapi-key": process.env.RAPIDAPI_KEY!
        }
    }

    const response = await axios.request(options)
    return response.data
}
