const { emailActionEnum } = require('../config');

module.exports = {
    [emailActionEnum.CREATE]: {
        templateName: 'create',
        subject: 'Hello, you are created account!!!'
    },
    [emailActionEnum.FORGOT]: {
        templateName: 'forgot',
        subject: 'Change your password'
    },
};
