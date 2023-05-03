// var express = require('express');
// var router = express.Router();

import express, { request } from 'express';
import { chatController, chatControllerV2 } from '../controllers/chatController';
import { chatHistoryController, chatHistoryControllerByChatId, chatHistoryControllerByUserId } from '../controllers/chatHistoryController';

// var db = require('../database').databaseConnection;
// import {db} from '../database';

const router = express.Router();
/* GET Chat listing. */
router.post('/getChatReply', chatController);
router.post('/getChatReplyV2',chatControllerV2);
router.post('/getChatHistory', chatHistoryController);
router.post('/getChatHistoryByID', chatHistoryControllerByChatId);
router.post('/getChatHistoryByUserId', chatHistoryControllerByUserId);
export default router;
