import {
    chatService
} from "../services/chatService";
import {
    chatHistoryService
} from "../services/chathistoryservice";
import { chatsTableService } from "../services/chatsTableService";
import { openaiService } from "../services/openAiService";
import { chatGptModel } from "../utils/aiConstants";
import { getMappedHistoryRecords } from "../utils/getMappedHistoryRecords";
import { getPromptFromSelectedFeature } from "../utils/getPromptFromSelectedFeature";

const TAG='ChatController';

export const chatController = async (req, res, next) => {
    const {
        message,
        userId
    } = req.body;
    console.log('> userid: ', userId)
    console.log('> Message: ', message)
    if (!message || !userId) {
        console.log(`> BAD Request error : userId:${userId}, message${message}`);
        return res.status(400).json({
            'message': `Please Include mandatory params, userId: ${userId}, message: ${message}.`
        });
    }
    try {
        const reply = await chatService.getMessageReplyFromOpenAi(message);
        // insert historyRecord to the database
        const history = {
                userId,
                userMessage: message,
                aiReply: reply,
            }
        const [insertResult, insertError] = await chatHistoryService.saveHistory(history);
        if (insertError) {
            console.error('Error Inserting History Record.', insertError)
        }
        if (insertResult) console.log('InsertHistory Record Successful. insertResult.');
        return res
                .status(200)
                .json({
                    reply: reply
                });
        //Handle database saving here
        if (reply) {

            // const Conversation ={
            //     userId : req.body.userId,
            //     userMessage : req.body.message,
            //     aiReply : reply
            // };   
            // exports.findALL = (req,res) => { 
            // const userId = req.query.userId;
            // var condition = userId ? { userId:  userId } : null;
            // Conversation.findALL({ where: condition })
            // .then(data=>{res.send(data)});
            // console.log('>---chathistory',chathistory)

            // };
        }
        //method to compare the data with existing conversation table
        //method to save the data to database();

    }
    // let sql = 'select' * FROM table';
    // connection.query(sql, (err, result) => {
    // if(err) throw err;
    // console.log(result);
    // res.send('Inventory received.');
    // });
    catch (err) {
        console.log("error in chatcontroller.", err);
        res.status(500).json({
            'errorMessage': 'Internal Server Error',
            'error': err
        })
    }
};

export const chatControllerV2 = async (req, res, next) => {
    const {
        userId,
        chatId,
        selectedFeature,
        newChat,
        message,
    } = req.body;
    console.log('> UserId: ', userId);
    console.log('> Selected Feature: ', selectedFeature);
    console.log('> Message: ', message);
    if (!message || !userId || !selectedFeature) {
        console.log(`> BAD Request error : userId:${userId}, selectedFeature:${selectedFeature}, message${message}`);
        return res.status(400).json({
            'message': `Please Include mandatory params, userId: ${userId}, selectedFeature:${selectedFeature}, message: ${message}.`
        });
    }
    try {
        const prompt = getPromptFromSelectedFeature(selectedFeature);
        const systemMessage = {role: 'system', content:prompt};
        const userMessage = {role: 'user', content: message}
        let updatedChatId = chatId;
        let reqBody = {};
        if (newChat){
            // create an entry in chatTable
            const chatRowRecord = { chatName: selectedFeature}; 
            const [chatInstance, insertError] = await chatsTableService.createChat(chatRowRecord)
            if(insertError) {
                console.log(`${TAG} | Error Inserting the record in CHATS table`, insertError);
                throw new Error(`${TAG} | Error Inserting the record in CHATS table`, insertError);
            }
            updatedChatId = chatInstance.id;
            console.log(`> ${TAG} | updated Chat ID: ${chatInstance.id}, ${chatInstance.chatName}`);
            reqBody = {
                model: chatGptModel,
                messages: [systemMessage, userMessage]
            }
        } else {
            // retrieve chatHistory First
            const [records, retrieveHistoryError] = await chatHistoryService.getHistoryByChatId(userId, chatId, {}, true);
            if(retrieveHistoryError) {
                console.log(`${TAG} | Error retrieving history`, retrieveHistoryError);
                throw new Error(`${TAG} | Error retrieving history`, retrieveHistoryError);
            }
            const mappedRecords = getMappedHistoryRecords(records);
            const messages = [ systemMessage, ...mappedRecords, userMessage ];
            reqBody = {
                model: chatGptModel,
                messages,
            }
        }
        const [reply, apiError] = await openaiService.getReplyFromOpenAi(reqBody);
        if(apiError) {
            console.log(`${TAG} | Error retrieving from OpenAI`, apiError);
            throw new Error(`${TAG} | Error retrieving reply from OpenAI`, apiError);
        }
        const history = {
            userId,
            chatId: updatedChatId,
            userMessage: message,
            aiReply: reply,
        }
        // insert new reply in chatHistory table
        const [insertResult, insertError] = await chatHistoryService.saveHistoryToChatHistory(history);
        if (insertError) {
            console.error(`${TAG} |Error Inserting History Record.`, insertError);
        }
        if (insertResult) console.log(`${TAG} | InsertHistory Record Successful.`);
        return res
                .status(200)
                .json({
                    chatId: updatedChatId,
                    reply: reply
                });

    }
    catch(err) {
        console.log(`error in ${TAG}.`, err);
        res.status(500).json({
            'errorMessage': 'Internal Server Error',
            'error': err
        })
    }
}