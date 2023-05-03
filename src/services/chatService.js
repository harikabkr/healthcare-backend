import axios from 'axios';
import dotenv from 'dotenv';
import { chatGptModel } from '../utils/aiConstants';
import { symptomCheckerPrompt } from '../utils/prompts';
import { openaiService } from './openAiService';

dotenv.config()

const OPENAI_CHAT_COMPLETION_URL = 'https://api.openai.com/v1/chat/completions'

export const chatService = {
    async getMessageReplyFromOpenAi(chatMessage) {
        const requestBody = {
            //"model":"text-davinci-003",
            //"model": "davinci-3.5-turbo",
             "model": chatGptModel,
            "messages": [{"role": "user", "content": chatMessage}]
        }
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
        if ( status !== 200) return 'ERROR FETCHING FROM API';
        const { message, finish_reason } = data.choices[0];
        const { role, content } = message;
        return content;
    }
};