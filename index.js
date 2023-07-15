const { Telegraf } = require('telegraf');
const axios = require('axios');
const cc = require('currency-codes');
const TELEGRAM_BOT_TOKEN ='6236805966:AAHo8DqAbdYeNDfqOYMmqqD0OPfBNMUbd_k';
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);


bot.start((ctx) => {
    return ctx.reply('Welcome to Currency Bot');
});

bot.hears(/^[A-Z]+$/i, async (ctx) => {
    const clientCurCode = ctx.message.text;
    const currency =cc.code(clientCurCode);
    try {
        const response = await axios.get('https://api.monobank.ua/bank/currency');
        const currencyObj = response.data[0];
        return ctx.reply(JSON.stringify(currencyObj));
    } catch (err) {
        return ctx.reply(err.message);
    }
});

bot.startPolling();
