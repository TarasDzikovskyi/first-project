module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb+srv://root:root@cluster0.ujec4.mongodb.net/project?retryWrites=true&w=majority',

    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Secret',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'Secret_2',
    ACTION_SECRET_KEY: process.env.ACTION_SECRET_KEY || 'Secret_3',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'tarasdz123@gmail.com',
    NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD || 'joistik12345',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',

    AWS_S3_NAME: process.env.AWS_S3_NAME || 'first-try-bucket',
    AWS_S3_REGION: process.env.AWS_S3_REGION || 'us-east-2',
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY || 'AKIAUGMCC6NTUUXBYR3V',
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY || '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',

    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'http://localhost:3000'
}


