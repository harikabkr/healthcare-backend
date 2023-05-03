import {
    chatHistoryService
} from "../services/chathistoryservice";

const TAG = 'CHAT_HISTORY_CONTROLLER';

export const chatHistoryController = async (req, res, next) => {
    const {
        userId,
        pagination,
    } = req.body;
    console.log('> userid: ', userId);
    console.log('> userid: ', pagination);
    if (!pagination || !userId) {
        console.log(`> ${TAG} |  BAD Request error : userId:${userId}, pagination: ${pagination}`);
        return res.status(400).json({
            'message': `Please Include mandatory params, userId: ${userId}, pagination: ${pagination}.`
        });
    }
    try {
        const [records, error] = await chatHistoryService.getHistory(userId, pagination);
        if (error){
            console.error(`> ${TAG} | Error in Retrieving Records.`, error);
            throw new Error(`Error in Retrieving Records. ${error.message}`);
        }
        console.log(`> ${TAG} | Fetched Records count: `, records.length);
        res
        .status(200)
        .json(records);
    }
    catch (err) {
        console.log(`> ${TAG} | Error in chatcontroller.`, err);
        res.status(500).json({
            'errorMessage': 'Internal Server Error',
            'error': err
        })
    }
};

export const chatHistoryControllerByChatId = async (req, res, next) => {
    const {
        userId,
        chatId,
        pagination,
    } = req.body;
    console.log('> chatId: ', chatId);
    console.log('> pagination: ', pagination);
    if (!pagination || !chatId || !userId) {
        console.log(`> ${TAG} |  BAD Request error : userId:${userId}, chatId:${chatId}, pagination: ${pagination}`);
        return res.status(400).json({
            'message': `Please Include mandatory params, userId:${userId}, chatId: ${chatId}, pagination: ${pagination}.`
        });
    }
    try {
        const [records, error] = await chatHistoryService.getHistoryByChatId(userId, chatId, pagination);
        if (error){
            console.error(`> ${TAG} | Error in Retrieving Records.`, error);
            throw new Error(`Error in Retrieving Records. ${error.message}`);
        }
        console.log(`> ${TAG} | Fetched Records count: `, records.length);
        res
        .status(200)
        .json({
            chatId,
            records
        });
    }
    catch (err) {
        console.log(`> ${TAG} | Error in chatcontroller.`, err);
        res.status(500).json({
            'errorMessage': 'Internal Server Error',
            'error': err
        })
    }
};

export const chatHistoryControllerByUserId = async (req, res, next) => {
    const {
        userId,
        pagination,
    } = req.body;
    console.log('> userId: ', userId);
    console.log('> pagination: ', pagination);
    if (!pagination || !userId) {
        console.log(`> ${TAG} |  BAD Request error : userId:${userId}, pagination: ${pagination}`);
        return res.status(400).json({
            'message': `Please Include mandatory params, userId:${userId}, pagination: ${pagination}.`
        });
    }
    try {
        const [records, error] = await chatHistoryService.getHistoryByUserId(userId, pagination);
        if (error){
            console.error(`> ${TAG} | Error in Retrieving Records.`, error);
            throw new Error(`Error in Retrieving Records. ${error.message}`);
        }
        console.log(`> ${TAG} | Fetched Records count: `, records.length);
        res
        .status(200)
        .json({
            records
        });
    }
    catch (err) {
        console.log(`> ${TAG} | Error in chatcontroller.`, err);
        res.status(500).json({
            'errorMessage': 'Internal Server Error',
            'error': err
        })
    }
};