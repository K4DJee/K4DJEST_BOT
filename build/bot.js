"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const grammy_1 = require("grammy");
const mail_1 = __importDefault(require("./mail"));
const http = __importStar(require("http"));
const BOT_DEVELOPER = 1367602882;
const BOT_TOKEN = process.env.BOT_TOKEN;
exports.config = {
    runtime: "nodejs", // или "nodejs18", "nodejs20" - проверьте поддерживаемые версии в документации Vercel
};
if (!BOT_TOKEN)
    throw new Error("BOT_TOKEN не установлен");
const bot = new grammy_1.Bot(BOT_TOKEN);
//additional
const commands = [
    { command: "start", description: 'Запустить бота' },
    { command: "help", description: 'Помощь' }
    // {command:"settings", description:'Открыть настройки бота'},
];
const start_menu = new grammy_1.InlineKeyboard()
    .text('Цены', 'prices')
    .text('О студии', 'about')
    .text('Разработчик бота', 'dev')
    .toFlowed(1);
const help_keyboard = new grammy_1.InlineKeyboard()
    .text('Проблемы в боте', 'problems_in_bot')
    .text('Как заказать услугу', 'how_to_order')
    .toFlowed(1);
const start_keyboard = new grammy_1.Keyboard()
    .text('Цены')
    .text('О нас')
    .text('Заказать услугу')
    .text('Разработчик бота')
    .resized();
const settings_keyboard = new grammy_1.Keyboard()
    .text('Поменять язык')
    .toFlowed(1)
    .resized();
const services = new grammy_1.Keyboard()
    .text('Сайты')
    .text('Телеграмм боты')
    .text('Назад')
    .toFlowed(2)
    .resized();
const tg_bots = new grammy_1.Keyboard()
    .text('');
function validateApplication(text) {
    const lines = text.trim().split('\n').map((line) => line.trim()).filter(line => line.length > 0);
    const requiredFields = [
        '#Заявка на разработку',
        'Услуга:',
        'Описание:',
        'Почта:',
        'ФИО:',
        'Никнейм в тг:'
    ];
    for (const field of requiredFields) {
        const found = lines.some(line => line.includes(field));
        if (!found) {
            console.log(`Не найдено поле: ${field}`);
            return false;
        }
    }
    if (!lines[0].includes('#Заявка на разработку')) {
        console.log('Хэштег должен быть первым');
        return false;
    }
    return true;
}
const date = new Date();
const options2 = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'UTC'
};
//middlewares
bot.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    ctx.config = {
        botDeveloper: BOT_DEVELOPER,
        isDeveloper: ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id) === BOT_DEVELOPER,
    };
    yield next();
}));
bot.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!ctx.update || typeof ctx.update !== "object") {
            console.error("Invalid update received:", ctx.update);
            return;
        }
        yield next();
    }
    catch (err) {
        console.error("Middleware error:", err);
    }
}));
//commands
bot.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.config.isDeveloper)
        yield ctx.reply("Привет, мам!", {
            reply_markup: start_keyboard
        });
    else
        yield ctx.reply(`Добро пожаловать в студию разработки K4DJE Studio!

    Тут вы можете узнать больше о студии, заказывать различные услуги через удобные способы оплаты.
    
    Мой сайт - https://k4dje-frontend.site
    Моя личка - @tji_fear`, {
            reply_markup: start_keyboard
        }),
            yield bot.api.setMyCommands(commands);
}));
bot.command("help", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.reply('Выберите команду:', {
        reply_markup: help_keyboard
    });
}));
// bot.command('settings', async(ctx)=>{
//   ctx.reply('Настройки:',{
//     reply_markup: settings_keyboard
//   })
// })
//events
bot.on("message").on("::hashtag", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const text = ctx.message.text;
    if (text === null || text === void 0 ? void 0 : text.includes('#Заявка на разработку')) {
        const isValid = validateApplication(text);
        if (isValid) {
            const info = yield mail_1.default.sendMail({
                from: '"K4DJESTUDIO" <klanshopk4dje@mail.ru>',
                to: `k4djexfullstack@gmail.com`,
                subject: "Заявка на разработку",
                text: `${text}`,
                html: `
        <html>
      <body style="font-family: Arial, sans-serif; font-size: 14px;">
        <p><strong>#Заявка на разработку</strong></p>
        <p><strong>Услуга:</strong> ${ctx.message.text.split('Услуга:')[1].split('Описание:')[0].trim()}</p>
        <p><strong>Описание:</strong> ${ctx.message.text.split('Описание:')[1].split('Почта:')[0].trim()}</p>
        <p><strong>Почта:</strong> ${ctx.message.text.split('Почта:')[1].split('ФИО:')[0].trim()}</p>
        <p><strong>ФИО:</strong> ${ctx.message.text.split('ФИО:')[1].split('Никнейм в тг:')[0].trim()}</p>
        <p><strong>Никнейм в тг:</strong> ${ctx.message.text.split('Никнейм в тг:')[1].trim()}</p>
      </body>
    </html>
        ` // html body
            });
            console.log("Message sent: %s", info.messageId);
            if (!info.messageId) {
                return yield ctx.reply('❌ Ошибка при отправке заявки. Попробуйте отправить ещё раз!');
            }
            yield ctx.reply('✅ Заявка принята! Мы свяжемся с вами в ближайшее время.');
        }
        else {
            yield ctx.reply('❌ Заявка заполнена некорректно. Пожалуйста, следуйте примеру строго.');
        }
    }
}));
//hearings
bot.hears('Заказать услугу', (ctx) => ctx.reply('Выберите услуги:', {
    reply_markup: services,
}));
bot.hears('Сайты', (ctx) => ctx.reply(`
  Чтобы оставить заявку, вам нужно заполнить её по этому примеру и отправить её боту:

  <b>#Заявка на разработку</b>
  <b>Услуга: (Разработка сайта)</b>
  <b>Описание: (Описание вашего проекта)</b>
  <b>Почта: (Ваша почта)</b>
  <b>ФИО: (Иванов Иван Иванович)</b>
  <b> Никнейм в тг: (@ваш_никнейм)</b>
  
  ⚠️ <b>Важно:</b> Чтобы заявка была принята, вы должны строго следовать примеру!
  `, {
    parse_mode: 'HTML'
}));
bot.hears('Телеграмм боты', (ctx) => ctx.reply(`
  Чтобы оставить заявку, вам нужно заполнить её по этому примеру и отправить её боту:

  <b>#Заявка на разработку</b>
  <b>Услуга: (Разработка телеграмм бота)</b>
  <b>Описание: (Описание вашего проекта)</b>
  <b>Почта: (Ваша почта)</b>
  <b>ФИО: (Иванов Иван Иванович)</b>
  <b> Никнейм в тг: (@ваш_никнейм)</b>
  
  ⚠️ <b>Важно:</b> Чтобы заявка была принята, вы должны строго следовать примеру!
  `, {
    parse_mode: 'HTML'
}));
bot.hears('Цены', (ctx) => ctx.reply(`
  💰 <b>Примерные цены на услуги:</b>

    🌐 <b>Сайты:</b>
    • Многостраничный сайт - 12 500 ₽
    • Одностраничный сайт (лендинг) - 9 200 ₽
    • Интернет-магазин - от 32 000 ₽ (зависит от объема)
    • Веб-приложения с backend - от 25 000 ₽
    
    🤖 <b>Telegram боты:</b>
    • Минимальная цена - 1 500 ₽
    • Сложные боты с интеграциями - от 5 000 ₽
    
    ⚠️ <b>Важно:</b>
    Цены могут варьироваться в зависимости от:
    • Сложности проекта
    • Сроков выполнения
    • Дополнительных функций
    • Интеграций с API
    
    Для точного расчета стоимости свяжитесь со мной: @tji_fear
  `, {
    parse_mode: 'HTML'
}));
bot.hears(['Вернуться в меню', 'Назад'], (ctx) => ctx.reply('Меню', {
    reply_markup: start_keyboard
}));
bot.hears('О нас', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(`K4DJE Studio - это это студия fullstack разработки
  
    Основные навыки:
    • HTML/CSS
    • JavaScript/Vue/Nuxt
    • TypeScript
    • Node.js
    • GrammY
    
    Создаю современные веб-решения от интерфейсов до backend систем.`);
}));
bot.hears('Разработчик бота', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(`
    Разработчик этого бота @tji_fear
    `, { parse_mode: 'HTML' });
}));
//callbacks
bot.callbackQuery('about', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.answerCallbackQuery();
    yield ctx.reply(`K4DJE Studio - это это студия fullstack разработки
  
Основные навыки:
• HTML/CSS
• JavaScript/Vue/Nuxt
• TypeScript
• Node.js
• GrammY

Создаю современные веб-решения от интерфейсов до backend систем.`);
}));
bot.callbackQuery(['prices', 'Цены'], (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.answerCallbackQuery();
    yield ctx.reply(`💰 <b>Примерные цены на услуги:</b>

    🌐 <b>Сайты:</b>
    • Многостраничный сайт - 12 500 ₽
    • Одностраничный сайт (лендинг) - 9 200 ₽
    • Интернет-магазин - от 32 000 ₽ (зависит от объема)
    • Веб-приложения с backend - от 25 000 ₽
    
    🤖 <b>Telegram боты:</b>
    • Минимальная цена - 1 500 ₽
    • Сложные боты с интеграциями - от 5 000 ₽
    
    ⚠️ <b>Важно:</b>
    Цены могут варьироваться в зависимости от:
    • Сложности проекта
    • Сроков выполнения
    • Дополнительных функций
    • Интеграций с API
    
    Для точного расчета стоимости свяжитесь со мной: @tji_fear`, { parse_mode: 'HTML' });
}));
bot.callbackQuery('dev', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.answerCallbackQuery();
    yield ctx.reply(`
    Разработчик этого бота @tji_fear
    `, { parse_mode: 'HTML' });
}));
bot.callbackQuery('problems_in_bot', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.answerCallbackQuery();
    yield ctx.reply(`
    Если нашли проблему в боте, напишите мне в личку @tji_fear
    `, { parse_mode: 'HTML' });
}));
bot.callbackQuery('how_to_order', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.answerCallbackQuery();
    yield ctx.reply(`
    Чтобы заказать какую-либо услугу, вам нужно заполнить заявку и отправить её по этому примеру:

  <b>#Заявка на разработку</b>
  <b>Услуга: (Разработка телеграмм бота)</b>
  <b>Описание: (Описание вашего проекта)</b>
  <b>Почта: (Ваша почта)</b>
  <b>ФИО: (Иванов Иван Иванович)</b>
  <b> Никнейм в тг: (@ваш_никнейм)</b>
  
  ⚠️ <b>Важно:</b> Чтобы заявка была принята, вы должны строго следовать примеру!
    `, { parse_mode: 'HTML' });
}));
// bot.start();
bot.api.getWebhookInfo().then(info => console.log(info));
const handle = (0, grammy_1.webhookCallback)(bot, "http", { secretToken: undefined });
const server = http.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Запрос получен:', req.url);
    // Проверяем, является ли запрос вебхуком от Telegram (например, POST на /)
    // Убедитесь, что путь соответствует тому, который вы указали в setWebhook
    if (req.method === 'POST' && req.url === '/') { // Или другой путь, если вы его меняли
        try {
            // Передаем оригинальный req и res в handle
            // handle внутри будет слушать события 'data', 'end' и парсить тело
            yield handle(req, res);
        }
        catch (err) {
            console.error("Ошибка при обработке вебхука через Grammy:", err);
            if (!res.headersSent) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Ошибка обработки вебхука Grammy');
            }
        }
    }
    else {
        // Обработка других путей (например, GET / для проверки работы сервера)
        console.log(`Запрошен неизвестный путь: ${req.method} ${req.url}`);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
}));
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Бот запущен и слушает вебхуки на порту ${PORT}`);
    console.log(date.toLocaleDateString("ru", options2));
    // Не вызываем bot.api.setWebhook здесь. Это делается вручную один раз после деплоя.
});
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`);
    const e = err.error;
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
