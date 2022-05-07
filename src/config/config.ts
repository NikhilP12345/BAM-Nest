export default() => ({
    port: 3000,
    database: {
        url: 'mongodb+srv://nikhil:nikhil@cluster0.aj6mj.mongodb.net/test'
    },
    redis: {
        host: 'redis-18842.c265.us-east-1-2.ec2.cloud.redislabs.com',
        port: 18842,
        password: 'xcrff84sElzZHWAJxwnK3Jh87SxNRakZ'
    },
    jwtSecretKey: 'secretKey',
    jwtExpiresIn: 24*60*60
})