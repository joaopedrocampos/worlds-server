const settings = {
    server: {
        host: 'localhost',
        port: process.env.PORT || 5000,
    },
    database: {
        user: process.env.DATABASE_USER || 'ae_natan',
        password: process.env.DATABASE_PASSWORD || 'mudar1234',
        host: process.env.DATABASE_HOST || 'localhost',
        port: process.env.DATABASE_PORT || '27017',
    },
};

module.exports = settings;
