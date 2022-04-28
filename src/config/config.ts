export default() => ({
    port: 3000,
    database: {
        url: 'mongodb+srv://nikhil:nikhil@cluster0.aj6mj.mongodb.net/test'
    },
    jwtSecretKey: 'secretKey',
    jwtExpiresIn: 24*60*60
})