/**
 * This file contains the constants and configuration variables used in the project
 */
const dotenv = require('dotenv');

dotenv.config();

export default {
  SUCCESS_STATUS: 200,
  SUCCESS_NOCONTENT_STATUS: 204,
  AUTH_FAILED_STATUS: 401,
  SERVER_BUSY_STATUS: 503,
  RESULT_URL: `${process.env.BASE_URL}/results`,
  LOGIN_URL: `${process.env.BASE_URL}/auth`,
  TEMP_EMAIL: 'abc@xyz.com',
  TEMP_PASS: 'lTgAYaLP9jRs',
  RETRY_COUNT: 10,
  AUTH_RETRY_COUNT: 10,
  DB_URL: process.env.DATABASE_URL,
  DB_HOST: process.env.DATABASE_HOST,
  DB_USER: process.env.DATABASE_USER,
  DB_PASS: process.env.DATABASE_PASS,
};
