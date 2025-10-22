/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
export class Logger {
  static info(message: string, ...args: any[]) {
    console.info(`[INFO] ${message}`, ...args)
  }

  static warn(message: string, ...args: any[]) {
    console.warn(`[WARN] ${message}`, ...args)
  }

  static error(message: string, ...args: any[]) {
    console.error(`[ERROR] ${message}`, ...args)
  }
}
