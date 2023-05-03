"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = void 0;
var _mysql = require("mysql");
require('dotenv').config();
var pool = (0, _mysql.createPool)({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 15
});
var _pool = pool;

// import mysql from 'mysql';
// require(dotenv).config();

//   const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'nodemysql'
//   });

//   //Connect to the database
//   db.connect((err)=>{
//     if(err){
//       throw err;
//     }
//     console.log("connected to nodemysql");
//   });

// //   app.get('/createdb',(req,res)=>{
// //     let sql = 'CREATE DATABASE nodemysql';
// //     db.query(sql, (err,result )=>{
// //       if(err) throw err;
// //       console.log(result);
// //       res.send('database created');
// //     });
// //   });

//   //Create Table
//   // app.get('/createconversationtable',(req,res)=>{
//   //   let sql = 'CREATE TABLE conversation(conversationId long, userId VARCHAR(255) , userMessage VARCHAR(), aiReply VARCHAR(),chatDateTime DATETIME())';  
//   //   db.query(sql,(err,result)=>{
//   //       if(err) throw err;
//   //       console.log(result);
//   //       res.send('Conversation table Created');
//   //   });
//   // });

//   exports.databaseConnection = db;
exports.pool = _pool;