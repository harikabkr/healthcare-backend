import { Op } from "sequelize";
import ChatHistory from "../models/ChatHistory";
import Chats from "../models/Chats";
import Conversations from "../models/Conversations";
import sequelize from "../services/sequelizeService";

const TAG = "CHAT_HISTORY_SERVICE";

export const chatHistoryService = {
  async saveHistoryToChatHistory(historyRecordRow) {
    return ChatHistory.create(historyRecordRow)
      .then((response) => {
        console.log(`${TAG} | RECORD INSERTED in Chat History Table !!!`);
        return [response, null];
      })
      .catch((err) => {
        console.error(`${TAG} | ERROR IN SAVING CHAT HISTORY !!!`, err);
        return [null, err];
      });
  },

  async saveHistory(historyRecordRow) {
    // Conversations
    return Conversations.create(historyRecordRow)
      .then((response) => {
        console.log(`${TAG} | RECORD INSERTED in Conversations Table !!!`);
        return [response, null];
      })
      .catch((err) => {
        console.error(`${TAG} | ERROR IN SAVING CHAT HISTORY !!!`, err);
        return [null, err];
      });
  },

  async getHistory(userId, pagination) {
    return Conversations.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      offset: pagination.offset,
      limit: pagination.limit,
    })
      .then((response) => {
        console.log(`${TAG} | FETCHED RECORDS COUNT: `, response.length);
        return [response, null];
      })
      .catch((err) => {
        console.error(`${TAG} | ERROR IN FETCHING CHAT HISTORY !!!`, err);
        return [null, err];
      });
  },

  async getHistoryByChatId(
    userId,
    chatId,
    pagination,
    fetchAllRecords = false
  ) {
    let queryOptions = {};
    if (fetchAllRecords) {
      queryOptions = {
        where: { userId, chatId },
        order: [["createdAt", "DESC"]],
      };
    } else {
      queryOptions = {
        where: { userId, chatId },
        order: [["createdAt", "DESC"]],
        offset: pagination.offset,
        limit: pagination.limit,
      };
    }
    return ChatHistory.findAll(queryOptions)
      .then((records) => {
        console.log(`${TAG} | FETCHED RECORDS COUNT: `, records.length);
        return [records, null];
      })
      .catch((err) => {
        console.error(
          `${TAG} | ERROR IN FETCHING CHAT HISTORY BY CHAT_ID !!!`,
          err
        );
        return [null, err];
      });
  },

  async getHistoryByUserId(userId, pagination) {
    return Chats.findAll({
      include: [
        {
          model: ChatHistory,
          as: "chathistories",
          where: { userId },
          right: true,
          attributes: ['id', 'userMessage', 'aiReply']
        },
      ],
      offset: pagination.offset,
      limit: pagination.limit,
    })
      .then((records) => {
        console.log(
          `${TAG} | FETCHED RECORDS COUNT FOR USER: `,
          records.length
        );
        return [records, null];
      })
      .catch((err) => {
        console.error(
          `${TAG} | ERROR IN FETCHING CHAT HISTORY BY USER_ID !!!`,
          err
        );
        return [null, err];
      });
  },
};
