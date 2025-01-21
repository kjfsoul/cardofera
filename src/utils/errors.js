export class CentralErrorHandler {
    static MAX_RETRIES = 3;
    static BASE_DELAY = 1000;
    static logError(context, error) {
        const errorData = {
            timestamp: new Date().toISOString(),
            context,
            error: error instanceof Error ? {
                name: error.name,
                message: error.message,
                stack: error.stack
            } : error
        };
        console.error('Application Error:', errorData);
        // TODO: Add Supabase logging integration
    }
    static async handleApiError(operation, context) {
        let attempts = 0;
        while (attempts < this.MAX_RETRIES) {
            try {
                return await operation();
            }
            catch (error) {
                this.logError(context, error);
                attempts++;
                if (attempts < this.MAX_RETRIES) {
                    const delay = this.BASE_DELAY * Math.pow(2, attempts);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
        return null;
    }
    static validateSupabaseResult(result, context) {
        if (result.error) {
            this.logError(context, result.error);
            throw new Error(`${context} failed: ${result.error.message}`);
        }
        if (!result.data) {
            const msg = `${context} returned empty data`;
            this.logError(context, msg);
            throw new Error(msg);
        }
        return result.data;
    }
    static createRetryWrapper() {
        return async (operation, context) => this.handleApiError(operation, context);
    }
}
export const retryWrapper = CentralErrorHandler.createRetryWrapper();
