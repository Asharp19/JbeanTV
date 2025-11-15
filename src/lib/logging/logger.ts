/**
 * Structured Logging Utility
 */

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

interface LogContext {
  [key: string]: any;
}

class Logger {
  private context: LogContext = {};

  /**
   * Set context for all subsequent logs
   */
  setContext(context: LogContext): void {
    this.context = { ...this.context, ...context };
  }

  /**
   * Clear context
   */
  clearContext(): void {
    this.context = {};
  }

  /**
   * Log debug message
   */
  debug(message: string, data?: LogContext): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  /**
   * Log info message
   */
  info(message: string, data?: LogContext): void {
    this.log(LogLevel.INFO, message, data);
  }

  /**
   * Log warning message
   */
  warn(message: string, data?: LogContext): void {
    this.log(LogLevel.WARN, message, data);
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error, data?: LogContext): void {
    const errorData = error
      ? {
          errorMessage: error.message,
          errorStack: process.env.NODE_ENV === "development" ? error.stack : undefined,
          ...data,
        }
      : data;

    this.log(LogLevel.ERROR, message, errorData);
  }

  /**
   * Core logging function
   */
  private log(level: LogLevel, message: string, data?: LogContext): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...this.context,
      ...data,
    };

    // In production, you would send this to a logging service (e.g., Sentry, LogRocket)
    // For now, we'll use console with structured output
    const logMethod = this.getConsoleMethod(level);
    logMethod(JSON.stringify(logEntry, null, process.env.NODE_ENV === "development" ? 2 : 0));
  }

  /**
   * Get appropriate console method for log level
   */
  private getConsoleMethod(level: LogLevel): (...args: any[]) => void {
    switch (level) {
      case LogLevel.DEBUG:
        return console.debug;
      case LogLevel.INFO:
        return console.info;
      case LogLevel.WARN:
        return console.warn;
      case LogLevel.ERROR:
        return console.error;
      default:
        return console.log;
    }
  }

  /**
   * Create a child logger with additional context
   */
  child(context: LogContext): Logger {
    const childLogger = new Logger();
    childLogger.context = { ...this.context, ...context };
    return childLogger;
  }
}

// Export singleton instance
export const logger = new Logger();

// Export helper for API route logging
export function createApiLogger(route: string, method: string): Logger {
  return logger.child({ route, method, type: "API" });
}

// Export helper for service logging
export function createServiceLogger(service: string): Logger {
  return logger.child({ service, type: "SERVICE" });
}

