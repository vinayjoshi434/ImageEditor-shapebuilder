import { useEffect, useState } from "react"
import axios from "axios"
import { baseurl, Apikey } from "./constant"



const usePictures = async (query) => {

    try {
        const response = await axios.get(baseurl, {
            headers: {
                Authorization: `${Apikey}`
            },
            params: {
                query: query,
                per_page: 2,
            }
        })
        return response.data.photos

    }

    catch (err) {
        console.log("failed to fetch details")
    }
}



export default usePictures