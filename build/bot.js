"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
var grammy_1 = require("grammy");
var mail_1 = require("./mail");
var BOT_DEVELOPER = 1367602882;
var BOT_TOKEN = process.env.BOT_TOKEN;
// export const config = {
//   runtime: "nodejs", // или "nodejs18", "nodejs20" - проверьте поддерживаемые версии в документации Vercel
// };
if (!BOT_TOKEN)
    throw new Error("BOT_TOKEN не установлен");
var bot = new grammy_1.Bot(BOT_TOKEN);
//additional
var commands = [
    { command: "start", description: 'Запустить бота' },
    { command: "help", description: 'Помощь' }
    // {command:"settings", description:'Открыть настройки бота'},
];
var start_menu = new grammy_1.InlineKeyboard()
    .text('Цены', 'prices')
    .text('О студии', 'about')
    .text('Разработчик бота', 'dev')
    .toFlowed(1);
var help_keyboard = new grammy_1.InlineKeyboard()
    .text('Проблемы в боте', 'problems_in_bot')
    .text('Как заказать услугу', 'how_to_order')
    .toFlowed(1);
var start_keyboard = new grammy_1.Keyboard()
    .text('Цены')
    .text('О нас')
    .text('Заказать услугу')
    .text('Разработчик бота')
    .resized();
var settings_keyboard = new grammy_1.Keyboard()
    .text('Поменять язык')
    .toFlowed(1)
    .resized();
var services = new grammy_1.Keyboard()
    .text('Сайты')
    .text('Телеграмм боты')
    .text('Назад')
    .toFlowed(2)
    .resized();
var tg_bots = new grammy_1.Keyboard()
    .text('');
function validateApplication(text) {
    var lines = text.trim().split('\n').map(function (line) { return line.trim(); }).filter(function (line) { return line.length > 0; });
    var requiredFields = [
        '#Заявка на разработку',
        'Услуга:',
        'Описание:',
        'Почта:',
        'ФИО:',
        'Никнейм в тг:'
    ];
    var _loop_1 = function (field) {
        var found = lines.some(function (line) { return line.includes(field); });
        if (!found) {
            console.log("\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E\u043B\u0435: ".concat(field));
            return { value: false };
        }
    };
    for (var _i = 0, requiredFields_1 = requiredFields; _i < requiredFields_1.length; _i++) {
        var field = requiredFields_1[_i];
        var state_1 = _loop_1(field);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    if (!lines[0].includes('#Заявка на разработку')) {
        console.log('Хэштег должен быть первым');
        return false;
    }
    return true;
}
//middlewares
bot.use(function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ctx.config = {
                    botDeveloper: BOT_DEVELOPER,
                    isDeveloper: ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id) === BOT_DEVELOPER,
                };
                return [4 /*yield*/, next()];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
//commands
bot.command("start", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!ctx.config.isDeveloper) return [3 /*break*/, 2];
                return [4 /*yield*/, ctx.reply("Привет, мам!", {
                        reply_markup: start_keyboard
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 5];
            case 2: return [4 /*yield*/, ctx.reply("\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0442\u0443\u0434\u0438\u044E \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438 K4DJE Studio!\n\n    \u0422\u0443\u0442 \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u043E \u0441\u0442\u0443\u0434\u0438\u0438, \u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438 \u0447\u0435\u0440\u0435\u0437 \u0443\u0434\u043E\u0431\u043D\u044B\u0435 \u0441\u043F\u043E\u0441\u043E\u0431\u044B \u043E\u043F\u043B\u0430\u0442\u044B.\n    \n    \u041C\u043E\u0439 \u0441\u0430\u0439\u0442 - https://k4dje-frontend.site\n    \u041C\u043E\u044F \u043B\u0438\u0447\u043A\u0430 - @tji_fear", {
                    reply_markup: start_keyboard
                })];
            case 3:
                _a.sent();
                return [4 /*yield*/, bot.api.setMyCommands(commands)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
bot.command("help", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.reply('Выберите команду:', {
            reply_markup: help_keyboard
        });
        return [2 /*return*/];
    });
}); });
// bot.command('settings', async(ctx)=>{
//   ctx.reply('Настройки:',{
//     reply_markup: settings_keyboard
//   })
// })
//events
bot.on("message").on("::hashtag", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var text, isValid, info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                text = ctx.message.text;
                if (!(text === null || text === void 0 ? void 0 : text.includes('#Заявка на разработку'))) return [3 /*break*/, 7];
                isValid = validateApplication(text);
                if (!isValid) return [3 /*break*/, 5];
                return [4 /*yield*/, mail_1.default.sendMail({
                        from: '"K4DJESTUDIO" <klanshopk4dje@mail.ru>',
                        to: "k4djexfullstack@gmail.com",
                        subject: "Заявка на разработку",
                        text: "".concat(text),
                        html: "\n        <html>\n      <body style=\"font-family: Arial, sans-serif; font-size: 14px;\">\n        <p><strong>#\u0417\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0443</strong></p>\n        <p><strong>\u0423\u0441\u043B\u0443\u0433\u0430:</strong> ".concat(ctx.message.text.split('Услуга:')[1].split('Описание:')[0].trim(), "</p>\n        <p><strong>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:</strong> ").concat(ctx.message.text.split('Описание:')[1].split('Почта:')[0].trim(), "</p>\n        <p><strong>\u041F\u043E\u0447\u0442\u0430:</strong> ").concat(ctx.message.text.split('Почта:')[1].split('ФИО:')[0].trim(), "</p>\n        <p><strong>\u0424\u0418\u041E:</strong> ").concat(ctx.message.text.split('ФИО:')[1].split('Никнейм в тг:')[0].trim(), "</p>\n        <p><strong>\u041D\u0438\u043A\u043D\u0435\u0439\u043C \u0432 \u0442\u0433:</strong> ").concat(ctx.message.text.split('Никнейм в тг:')[1].trim(), "</p>\n      </body>\n    </html>\n        ") // html body
                    })];
            case 1:
                info = _a.sent();
                console.log("Message sent: %s", info.messageId);
                if (!!info.messageId) return [3 /*break*/, 3];
                return [4 /*yield*/, ctx.reply('❌ Ошибка при отправке заявки. Попробуйте отправить ещё раз!')];
            case 2: return [2 /*return*/, _a.sent()];
            case 3: return [4 /*yield*/, ctx.reply('✅ Заявка принята! Мы свяжемся с вами в ближайшее время.')];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, ctx.reply('❌ Заявка заполнена некорректно. Пожалуйста, следуйте примеру строго.')];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); });
//hearings
bot.hears('Заказать услугу', function (ctx) { return ctx.reply('Выберите услуги:', {
    reply_markup: services,
}); });
bot.hears('Сайты', function (ctx) { return ctx.reply("\n  \u0427\u0442\u043E\u0431\u044B \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443, \u0432\u0430\u043C \u043D\u0443\u0436\u043D\u043E \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0435\u0451 \u043F\u043E \u044D\u0442\u043E\u043C\u0443 \u043F\u0440\u0438\u043C\u0435\u0440\u0443 \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0435\u0451 \u0431\u043E\u0442\u0443:\n\n  <b>#\u0417\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0443</b>\n  <b>\u0423\u0441\u043B\u0443\u0433\u0430: (\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0441\u0430\u0439\u0442\u0430)</b>\n  <b>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435: (\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0432\u0430\u0448\u0435\u0433\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0430)</b>\n  <b>\u041F\u043E\u0447\u0442\u0430: (\u0412\u0430\u0448\u0430 \u043F\u043E\u0447\u0442\u0430)</b>\n  <b>\u0424\u0418\u041E: (\u0418\u0432\u0430\u043D\u043E\u0432 \u0418\u0432\u0430\u043D \u0418\u0432\u0430\u043D\u043E\u0432\u0438\u0447)</b>\n  <b> \u041D\u0438\u043A\u043D\u0435\u0439\u043C \u0432 \u0442\u0433: (@\u0432\u0430\u0448_\u043D\u0438\u043A\u043D\u0435\u0439\u043C)</b>\n  \n  \u26A0\uFE0F <b>\u0412\u0430\u0436\u043D\u043E:</b> \u0427\u0442\u043E\u0431\u044B \u0437\u0430\u044F\u0432\u043A\u0430 \u0431\u044B\u043B\u0430 \u043F\u0440\u0438\u043D\u044F\u0442\u0430, \u0432\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u0441\u0442\u0440\u043E\u0433\u043E \u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u0438\u043C\u0435\u0440\u0443!\n  ", {
    parse_mode: 'HTML'
}); });
bot.hears('Телеграмм боты', function (ctx) { return ctx.reply("\n  \u0427\u0442\u043E\u0431\u044B \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443, \u0432\u0430\u043C \u043D\u0443\u0436\u043D\u043E \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0435\u0451 \u043F\u043E \u044D\u0442\u043E\u043C\u0443 \u043F\u0440\u0438\u043C\u0435\u0440\u0443 \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0435\u0451 \u0431\u043E\u0442\u0443:\n\n  <b>#\u0417\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0443</b>\n  <b>\u0423\u0441\u043B\u0443\u0433\u0430: (\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0442\u0435\u043B\u0435\u0433\u0440\u0430\u043C\u043C \u0431\u043E\u0442\u0430)</b>\n  <b>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435: (\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0432\u0430\u0448\u0435\u0433\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0430)</b>\n  <b>\u041F\u043E\u0447\u0442\u0430: (\u0412\u0430\u0448\u0430 \u043F\u043E\u0447\u0442\u0430)</b>\n  <b>\u0424\u0418\u041E: (\u0418\u0432\u0430\u043D\u043E\u0432 \u0418\u0432\u0430\u043D \u0418\u0432\u0430\u043D\u043E\u0432\u0438\u0447)</b>\n  <b> \u041D\u0438\u043A\u043D\u0435\u0439\u043C \u0432 \u0442\u0433: (@\u0432\u0430\u0448_\u043D\u0438\u043A\u043D\u0435\u0439\u043C)</b>\n  \n  \u26A0\uFE0F <b>\u0412\u0430\u0436\u043D\u043E:</b> \u0427\u0442\u043E\u0431\u044B \u0437\u0430\u044F\u0432\u043A\u0430 \u0431\u044B\u043B\u0430 \u043F\u0440\u0438\u043D\u044F\u0442\u0430, \u0432\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u0441\u0442\u0440\u043E\u0433\u043E \u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u0438\u043C\u0435\u0440\u0443!\n  ", {
    parse_mode: 'HTML'
}); });
bot.hears('Цены', function (ctx) { return ctx.reply("\n  \uD83D\uDCB0 <b>\u041F\u0440\u0438\u043C\u0435\u0440\u043D\u044B\u0435 \u0446\u0435\u043D\u044B \u043D\u0430 \u0443\u0441\u043B\u0443\u0433\u0438:</b>\n\n    \uD83C\uDF10 <b>\u0421\u0430\u0439\u0442\u044B:</b>\n    \u2022 \u041C\u043D\u043E\u0433\u043E\u0441\u0442\u0440\u0430\u043D\u0438\u0447\u043D\u044B\u0439 \u0441\u0430\u0439\u0442 - 12 500 \u20BD\n    \u2022 \u041E\u0434\u043D\u043E\u0441\u0442\u0440\u0430\u043D\u0438\u0447\u043D\u044B\u0439 \u0441\u0430\u0439\u0442 (\u043B\u0435\u043D\u0434\u0438\u043D\u0433) - 9 200 \u20BD\n    \u2022 \u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u043C\u0430\u0433\u0430\u0437\u0438\u043D - \u043E\u0442 32 000 \u20BD (\u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u043E\u0431\u044A\u0435\u043C\u0430)\n    \u2022 \u0412\u0435\u0431-\u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0441 backend - \u043E\u0442 25 000 \u20BD\n    \n    \uD83E\uDD16 <b>Telegram \u0431\u043E\u0442\u044B:</b>\n    \u2022 \u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0446\u0435\u043D\u0430 - 1 500 \u20BD\n    \u2022 \u0421\u043B\u043E\u0436\u043D\u044B\u0435 \u0431\u043E\u0442\u044B \u0441 \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F\u043C\u0438 - \u043E\u0442 5 000 \u20BD\n    \n    \u26A0\uFE0F <b>\u0412\u0430\u0436\u043D\u043E:</b>\n    \u0426\u0435\u043D\u044B \u043C\u043E\u0433\u0443\u0442 \u0432\u0430\u0440\u044C\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0432 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438 \u043E\u0442:\n    \u2022 \u0421\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u0430\n    \u2022 \u0421\u0440\u043E\u043A\u043E\u0432 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F\n    \u2022 \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0444\u0443\u043D\u043A\u0446\u0438\u0439\n    \u2022 \u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0439 \u0441 API\n    \n    \u0414\u043B\u044F \u0442\u043E\u0447\u043D\u043E\u0433\u043E \u0440\u0430\u0441\u0447\u0435\u0442\u0430 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438 \u0441\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441\u043E \u043C\u043D\u043E\u0439: @tji_fear\n  ", {
    parse_mode: 'HTML'
}); });
bot.hears(['Вернуться в меню', 'Назад'], function (ctx) { return ctx.reply('Меню', {
    reply_markup: start_keyboard
}); });
bot.hears('О нас', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.reply("K4DJE Studio - \u044D\u0442\u043E \u044D\u0442\u043E \u0441\u0442\u0443\u0434\u0438\u044F fullstack \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438\n  \n    \u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u043D\u0430\u0432\u044B\u043A\u0438:\n    \u2022 HTML/CSS\n    \u2022 JavaScript/Vue/Nuxt\n    \u2022 TypeScript\n    \u2022 Node.js\n    \u2022 GrammY\n    \n    \u0421\u043E\u0437\u0434\u0430\u044E \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0432\u0435\u0431-\u0440\u0435\u0448\u0435\u043D\u0438\u044F \u043E\u0442 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u043E\u0432 \u0434\u043E backend \u0441\u0438\u0441\u0442\u0435\u043C.")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.hears('Разработчик бота', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.reply("\n    \u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A \u044D\u0442\u043E\u0433\u043E \u0431\u043E\u0442\u0430 @tji_fear\n    ", { parse_mode: 'HTML' })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//callbacks
bot.callbackQuery('about', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.answerCallbackQuery()];
            case 1:
                _a.sent();
                return [4 /*yield*/, ctx.reply("K4DJE Studio - \u044D\u0442\u043E \u044D\u0442\u043E \u0441\u0442\u0443\u0434\u0438\u044F fullstack \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438\n  \n\u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u043D\u0430\u0432\u044B\u043A\u0438:\n\u2022 HTML/CSS\n\u2022 JavaScript/Vue/Nuxt\n\u2022 TypeScript\n\u2022 Node.js\n\u2022 GrammY\n\n\u0421\u043E\u0437\u0434\u0430\u044E \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0432\u0435\u0431-\u0440\u0435\u0448\u0435\u043D\u0438\u044F \u043E\u0442 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u043E\u0432 \u0434\u043E backend \u0441\u0438\u0441\u0442\u0435\u043C.")];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.callbackQuery(['prices', 'Цены'], function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.answerCallbackQuery()];
            case 1:
                _a.sent();
                return [4 /*yield*/, ctx.reply("\uD83D\uDCB0 <b>\u041F\u0440\u0438\u043C\u0435\u0440\u043D\u044B\u0435 \u0446\u0435\u043D\u044B \u043D\u0430 \u0443\u0441\u043B\u0443\u0433\u0438:</b>\n\n    \uD83C\uDF10 <b>\u0421\u0430\u0439\u0442\u044B:</b>\n    \u2022 \u041C\u043D\u043E\u0433\u043E\u0441\u0442\u0440\u0430\u043D\u0438\u0447\u043D\u044B\u0439 \u0441\u0430\u0439\u0442 - 12 500 \u20BD\n    \u2022 \u041E\u0434\u043D\u043E\u0441\u0442\u0440\u0430\u043D\u0438\u0447\u043D\u044B\u0439 \u0441\u0430\u0439\u0442 (\u043B\u0435\u043D\u0434\u0438\u043D\u0433) - 9 200 \u20BD\n    \u2022 \u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u043C\u0430\u0433\u0430\u0437\u0438\u043D - \u043E\u0442 32 000 \u20BD (\u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u043E\u0431\u044A\u0435\u043C\u0430)\n    \u2022 \u0412\u0435\u0431-\u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0441 backend - \u043E\u0442 25 000 \u20BD\n    \n    \uD83E\uDD16 <b>Telegram \u0431\u043E\u0442\u044B:</b>\n    \u2022 \u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0446\u0435\u043D\u0430 - 1 500 \u20BD\n    \u2022 \u0421\u043B\u043E\u0436\u043D\u044B\u0435 \u0431\u043E\u0442\u044B \u0441 \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F\u043C\u0438 - \u043E\u0442 5 000 \u20BD\n    \n    \u26A0\uFE0F <b>\u0412\u0430\u0436\u043D\u043E:</b>\n    \u0426\u0435\u043D\u044B \u043C\u043E\u0433\u0443\u0442 \u0432\u0430\u0440\u044C\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0432 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438 \u043E\u0442:\n    \u2022 \u0421\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u0430\n    \u2022 \u0421\u0440\u043E\u043A\u043E\u0432 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F\n    \u2022 \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0444\u0443\u043D\u043A\u0446\u0438\u0439\n    \u2022 \u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0439 \u0441 API\n    \n    \u0414\u043B\u044F \u0442\u043E\u0447\u043D\u043E\u0433\u043E \u0440\u0430\u0441\u0447\u0435\u0442\u0430 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438 \u0441\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441\u043E \u043C\u043D\u043E\u0439: @tji_fear", { parse_mode: 'HTML' })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.callbackQuery('dev', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.answerCallbackQuery()];
            case 1:
                _a.sent();
                return [4 /*yield*/, ctx.reply("\n    \u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A \u044D\u0442\u043E\u0433\u043E \u0431\u043E\u0442\u0430 @tji_fear\n    ", { parse_mode: 'HTML' })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.callbackQuery('problems_in_bot', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.answerCallbackQuery()];
            case 1:
                _a.sent();
                return [4 /*yield*/, ctx.reply("\n    \u0415\u0441\u043B\u0438 \u043D\u0430\u0448\u043B\u0438 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443 \u0432 \u0431\u043E\u0442\u0435, \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043C\u043D\u0435 \u0432 \u043B\u0438\u0447\u043A\u0443 @tji_fear\n    ", { parse_mode: 'HTML' })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.callbackQuery('how_to_order', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.answerCallbackQuery()];
            case 1:
                _a.sent();
                return [4 /*yield*/, ctx.reply("\n    \u0427\u0442\u043E\u0431\u044B \u0437\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043A\u0430\u043A\u0443\u044E-\u043B\u0438\u0431\u043E \u0443\u0441\u043B\u0443\u0433\u0443, \u0432\u0430\u043C \u043D\u0443\u0436\u043D\u043E \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443 \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0435\u0451 \u043F\u043E \u044D\u0442\u043E\u043C\u0443 \u043F\u0440\u0438\u043C\u0435\u0440\u0443:\n\n  <b>#\u0417\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0443</b>\n  <b>\u0423\u0441\u043B\u0443\u0433\u0430: (\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0442\u0435\u043B\u0435\u0433\u0440\u0430\u043C\u043C \u0431\u043E\u0442\u0430)</b>\n  <b>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435: (\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0432\u0430\u0448\u0435\u0433\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0430)</b>\n  <b>\u041F\u043E\u0447\u0442\u0430: (\u0412\u0430\u0448\u0430 \u043F\u043E\u0447\u0442\u0430)</b>\n  <b>\u0424\u0418\u041E: (\u0418\u0432\u0430\u043D\u043E\u0432 \u0418\u0432\u0430\u043D \u0418\u0432\u0430\u043D\u043E\u0432\u0438\u0447)</b>\n  <b> \u041D\u0438\u043A\u043D\u0435\u0439\u043C \u0432 \u0442\u0433: (@\u0432\u0430\u0448_\u043D\u0438\u043A\u043D\u0435\u0439\u043C)</b>\n  \n  \u26A0\uFE0F <b>\u0412\u0430\u0436\u043D\u043E:</b> \u0427\u0442\u043E\u0431\u044B \u0437\u0430\u044F\u0432\u043A\u0430 \u0431\u044B\u043B\u0430 \u043F\u0440\u0438\u043D\u044F\u0442\u0430, \u0432\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u0441\u0442\u0440\u043E\u0433\u043E \u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u0438\u043C\u0435\u0440\u0443!\n    ", { parse_mode: 'HTML' })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// bot.start();
// const handle = webhookCallback(bot, "https"); // <-- Измените эту строку
// export default webhookCallback(bot, "express");
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var handlerFunction, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    handlerFunction = (0, grammy_1.webhookCallback)(bot, "express");
                    // Передаем объекты req и res напрямую в обработчик Grammy
                    return [4 /*yield*/, handlerFunction(req, res)];
                case 1:
                    // Передаем объекты req и res напрямую в обработчик Grammy
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error("Ошибка в обработчике Vercel:", err_1);
                    // Отправляем ответ об ошибке, если что-то пошло не так до передачи управления Grammy
                    if (!res.headersSent) {
                        res.status(500).send('Internal Server Error');
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// export default async function handler(request: Request) {
//   try {
//     return await handle(request);
//   } catch (err) {
//     console.error(err);
//     return new Response('Internal Server Error', { status: 500 });
//   }
// }
bot.catch(function (err) {
    var ctx = err.ctx;
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F ".concat(ctx.update.update_id, ":"));
    var e = err.error;
    if (e instanceof grammy_1.GrammyError) {
        console.error("Ошибка в запросе:", e.description);
    }
    else if (e instanceof grammy_1.HttpError) {
        console.error("Не удалось связаться с Telegram:", e);
    }
    else {
        console.error("Неизвестная ошибка:", e);
    }
});
