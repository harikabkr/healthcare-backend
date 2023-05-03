// This is a service file for executing sql query using low-level sql packages

export const dbService = {
    async executeQuery(sql, params) {
        try {
                const [results, ] = await connection.execute(sql, params);
                return [results, null];
        } catch(error) {
            return [null, error]
        }
    }
}