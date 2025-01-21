import { SupabaseClient } from "@supabase/supabase-js";

export class CentralErrorHandler {
  private static MAX_RETRIES = 3;
  private static BASE_DELAY = 1000;

  static logError(context: string, error: unknown): void {
    const errorData = {
      timestamp: new Date().toISOString(),
      context,
      error:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            }
          : error,
    };

    console.error("Application Error:", errorData);
    // TODO: Add Supabase logging integration
  }

  static async handleApiError<T>(
    operation: () => Promise<T>,
    context: string,
  ): Promise<T | null> {
    let attempts = 0;

    while (attempts < this.MAX_RETRIES) {
      try {
        return await operation();
      } catch (error) {
        this.logError(context, error);
        attempts++;

        if (attempts < this.MAX_RETRIES) {
          const delay = this.BASE_DELAY * Math.pow(2, attempts);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    return null;
  }

  static validateSupabaseResult<T>(
    result: { data?: T; error?: any },
    context: string,
  ): T | never {
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
    return async <T>(operation: () => Promise<T>, context: string) =>
      this.handleApiError(operation, context);
  }
}

export const retryWrapper = CentralErrorHandler.createRetryWrapper();
