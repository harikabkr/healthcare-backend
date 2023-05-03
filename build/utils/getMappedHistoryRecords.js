"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMappedHistoryRecords = void 0;
var getMappedHistoryRecords = function getMappedHistoryRecords() {
  var records = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  if (records.length < 1) return [];
  var mappedRecords = records.map(function (record) {
    return [{
      role: 'user',
      content: record.userMessage
    }, {
      role: 'assistant',
      content: record.aiReply
    }];
  });
  return mappedRecords.flat(1);
};
exports.getMappedHistoryRecords = getMappedHistoryRecords;