import { createClient } from 'redis';


const client = createClient({
    password: 'rDIQdOSYKin5AGOP1lQCBhp1n5lD3oOz',
    socket: {
        host: 'redis-10391.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 10391
    }
});

client.on('error', (err) => console.log('Redis Client Error', err));


// Function to flush all cache in Redis
const flushAllCache = async () => {
    try {
      await client.flushall();
      console.log('All Redis cache flushed successfully');
    } catch (error) {
      console.error('Error flushing Redis cache:', error);
    }
  };

export { flushAllCache };