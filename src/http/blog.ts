import axios from "axios";
import { Post } from "../modal/ApiResponsModal";

    const baseURL = import.meta.env.VITE_API_URL

export const getPosts = async (): Promise<Post[]> => {

    const config = {
        method: "get",
        url: `${baseURL}/posts`,
    };

    const response = await axios(config);
    return response.data;
}

export const viewPost = async (post_id: number): Promise<Post> => {

    const config = {
        method: "get",
        url: `${baseURL}/posts/${post_id}`,
    };

    const response = await axios(config);
    return response.data;
}

export const addPost = async (title: string, body: string): Promise<Post> => {

    const config = {
        method: "post",
        url: `${baseURL}/posts`,
        body: JSON.stringify({
            title: title,
            body: body,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    const response = await axios(config);
    return response.data;
}

export const updatePost = async (title: string, body: string, post_id: number): Promise<Post> => {
    
    const config = {
        method: "PUT",
        url: `${baseURL}/posts/${post_id}`,
        body: JSON.stringify({
            title: title,
            body: body,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    const response = await axios(config);
    return response.data;
}

export const deletePost = async (post_id: number): Promise<any> => {
    
    const config = {
        method: "DELETE",
        url: `${baseURL}/posts/${post_id}`
    };

    const response = await axios(config);
    return response.data;
}