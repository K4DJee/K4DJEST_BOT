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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const mail_1 = __importDefault(require("./mail"));
const dotenv_1 = __importDefault(require("dotenv"));
const BOT_DEVELOPER = 1367602882;
const bot = new grammy_1.Bot(process.env.BOT_TOKEN);
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
//middlewares
bot.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    ctx.config = {
        botDeveloper: BOT_DEVELOPER,
        isDeveloper: ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id) === BOT_DEVELOPER,
    };
    yield next();
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
bot.start();
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
