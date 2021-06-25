module.exports = (app) => {
    app.use('/tasks', require('../routes/task.routes'));
    app.use('/users', require('../routes/user.routes'));
    app.use('/auth', require('../routes/auth.routes'));
}