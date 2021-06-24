module.exports = {
    success: {
        s0: {
            code: "UserCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "UserUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "UserFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "UserDeleted",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoUsers",
            type: "success"
        }
    },
    error: {
        e0: {
            http: 404,
            code: "UserNotFound",
            type: "error"
        }
    }
}