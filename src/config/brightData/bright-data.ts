const username = String(process.env.BRIGHT_DATA_USERNAME);
const password = String(process.env.BRIGHT_DATA_PASSWORD);
const port = Number(process.env.BRIGHT_DATA_PORT);
const session_id = (1000000 * Math.random()) | 0;

export const BRIGHT_DATA_SETTINGS = {
  auth: {
    username: `${username}-session-${session_id}`,
    password,
  },
  host: 'brd.superproxy.io',
  port,
  rejectUnauthorized: false,
};
