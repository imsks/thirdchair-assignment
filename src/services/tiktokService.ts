import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST!
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY!

const headers = {
    "x-rapidapi-host": RAPIDAPI_HOST,
    "x-rapidapi-key": RAPIDAPI_KEY
}

export async function getSecUid(username: string) {
    const url = `https://${RAPIDAPI_HOST}/api/user/info?uniqueId=${username}`
    const { data } = await axios.get(url, { headers })
    return data.userInfo?.user?.secUid
}

export async function getAllPosts(secUid: string, count = 5, cursor = 0) {
    const url = `https://${RAPIDAPI_HOST}/api/user/posts?secUid=${secUid}&count=${count}&cursor=${cursor}`
    const { data } = await axios.get(url, { headers })
    return data
}
