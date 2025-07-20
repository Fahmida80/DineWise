import {Ratelimit} from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from "dotenv";
dotenv.config();

// const ratelimit = new Ratelimit({
//     redis: Redis.fromEnv(),
//     limiter: Ratelimit.slidingWindow(10, "10 s"), // 5 requests every 10 seconds
// });

// export default ratelimit;

const ratelimit = {
    limit: async () => ({ success: true }) // Bypass all rate limits
  };
  
  export default ratelimit;