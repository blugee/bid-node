/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const TokenGenerator = require('uuid-token-generator');
const otpGenerator = require('otp-generator')
const DateDiff = require('date-diff');
const moment = require('moment');
const uuid = require('uuid-random');
const md5 = require('md5');
const _ = require("lodash");
const iplocate = require('node-iplocate');

const jwt_secret = "ShreeHariji"
const jwt_issuer = "1Aujyh52los5ui2aw9d3"
/**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

/**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
};

/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
const validatePassword = (password) => {
    if (password.length <= 5 || password === '') {
        return false;
    } return true;
};
/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const isEmpty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
    if (input.replace(/\s/g, '').length) {
        return false;
    } return true;
};

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const empty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
};

/**
   * Generate Token
   * @param {string} id
   * @returns {string} token
   */
const generateUserToken = (id, email) => {
    const token = jwt.sign({ id, email },
        jwt_secret, { expiresIn: 60 * 60 * 24, issuer: jwt_issuer },
    );
    return token;
};

const generateSessionToken = () => {
    const token = new TokenGenerator(256, TokenGenerator.BASE62);
    return token.generate();
}

const generateOTP = () => {
    return otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
}

const dateDifference = (date1, date2) => {
    return new DateDiff(date1, date2);
}

const decodeJWTToken = (token) => {
    options = {
        expiresIn: 60 * 60 * 24,
        issuer: jwt_issuer
    };
    return jwt.verify(token, jwt_secret, options);
}

const getUTCDate = () => {
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

    return new Date(now_utc);
}

const getTodayDateWith1DayPlus = (date) => {
    return moment(new Date(date)).format('YYYY-MM-DD')
}

const getYesterdaysDate = () => {

    var yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    return moment(yesterdayDate).format('YYYY-MM-DD')
}

const getUTCDateTime = () => {
    var d1 = new Date();
    return d1.toUTCString();
}

const getUTCDateInString = () => {
    var d1 = new Date();
    return moment(d1).format('YYYYMMDD');
}

const getTodayDate = () => {
    var d1 = new Date();
    return moment(d1).format('YYYY-MM-DD');
}

const getDatesBetweenGivenDates = (startDate, endDate) => {
    var listDate = [];
    var startDate1 = startDate
    var endDate = endDate
    var dateMove = new Date(startDate1);
    var strDate = startDate1;

    while (strDate < endDate) {
        var strDate = dateMove.toISOString().slice(0, 10);
        listDate.push(strDate);
        dateMove.setDate(dateMove.getDate() + 1);
    };
    listDate.shift();
    listDate.pop();

    return listDate
}

const generateUniqueID = () => {
    return Date.now();
}

const getMeetingID = () => {
    var pin = Date.now().toString();
    return pin.substring(pin.length - 5);
}

const generatePersonalPIN = (length) => {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const generateOrgnaizationInitial = () => {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const generateRandomPasswordString = () => {
    var result = '';
    var characters = '>?|}{ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const makeUidForImage = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const findLocationThroughIp = async (Ip) => {
    let ipData = await iplocate(Ip, null, function (err, results) {
        return results
    });
    return ipData
}
const encryptLinkData = async (data) => {

    try {
        return encrypt(data);
    }
    catch (e) {
        throw e;
    }
}

const generateUUID = () => {
    return uuid();
}

const encryptMD5 = (value) => {
    return md5(value);
}

const checkPermission = (data, value) => {
    const permission = _.filter(data.users_permissions, e => e.permission.permission === value);

    if (permission[0] && permission[0].permission && permission[0].permission.permission === value) {
        return true;
    }
    else {
        return false;
    }
}


let validations = {
    hashPassword,
    comparePassword,
    isValidEmail,
    validatePassword,
    isEmpty,
    empty,
    generateUserToken,
    generateSessionToken,
    generateOTP,
    dateDifference,
    decodeJWTToken,
    getUTCDate,
    getUTCDateTime,
    getUTCDateInString,
    getTodayDate,
    getDatesBetweenGivenDates,
    generateUniqueID,
    generatePersonalPIN,
    getTodayDateWith1DayPlus,
    getYesterdaysDate,
    generateOrgnaizationInitial,
    generateRandomPasswordString,
    makeUidForImage,
    encryptLinkData,
    getMeetingID,
    generateUUID,
    encryptMD5,
    checkPermission,
    findLocationThroughIp
}

module.exports = validations;
