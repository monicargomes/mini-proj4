module.exports = {
    mongodb: {
        uri: 'mongodb://localhost/todo',
        collections: {
            task: 'tasks',
            user: 'user'
        }
    },
    auth: {
        expiration_time: 15000,
        issuer: "FCA"
    }
}