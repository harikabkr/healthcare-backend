import axios from "axios";
import dotenv from 'dotenv';
import { OPENAI_CHAT_COMPLETION_URL } from "../utils/urls";

dotenv.config();

export const openaiService = {
    async getReplyFromOpenAi(requestBody) {
        const response = await axios.post(
            OPENAI_CHAT_COMPLETION_URL, 
            requestBody,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    
                },
            }
        );
        const { data, status } = response;
        console.log('Returned response with code : ', status);
        if ( status !== 200) return [null,'ERROR FETCHING FROM API'];
        const { message, finish_reason } = data.choices[0];
        const { role, content } = message;
        return [content, null];
},
};