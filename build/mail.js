"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// mail.ts
var nodemailer = require("nodemailer");
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();
var transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
exports.default = transporter;
