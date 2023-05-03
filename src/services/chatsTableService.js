import Chats from "../models/Chats";

const TAG = 'CHATS_TABLE_SERVICE';

export const  chatsTableService = {
    async createChat(chatRowRecord) {
        // Conversations
        return Chats 
            .create(chatRowRecord)
            .then((response)=>{
                console.log(`${TAG} | RECORD INSERTED in Chats Table !!!`);
                return [response, null];
            })
            .catch((err)=>{
                console.error(`${TAG} | ERROR IN SAVING CHATS TABLE !!!`, err);
                return [null, err];
            });
    },
}