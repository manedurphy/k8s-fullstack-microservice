import redis from 'redis';
const client = redis.createClient({ url: process.env.WRITE_REDIS_URL });

client.on('error', function (error) {
    console.error(error);
});

export default client;
