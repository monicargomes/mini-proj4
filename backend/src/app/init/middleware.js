module.exports = (app) => {
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const routes = require('../routes/task.routes');

    app.use(cors());
    app.options('*', cors());
    app.use((req, res, callback) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization, Language, Location');
        res.header('Access-Control-Expose-Headers', 'Authorization, Language, Location');
        return callback();
    })

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use('/tasks', routes)
};
