export const getMappedHistoryRecords = (records=[]) => {
    if (records.length < 1) return []
    const mappedRecords = records.map((record) => {
        return [{
            role: 'user',
            content: record.userMessage,
        }, {
            role: 'assistant',
            content: record.aiReply,
        }]
    });
    return mappedRecords.flat(1);
}

