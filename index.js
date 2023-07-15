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
    console.log(currency);
    //check for existing currency
    if(!currency){
        return ctx.reply('Currency didnt found');
    }
    try {
        const currencyObj = await axios.get('https://api.monobank.ua/bank/currency');
        const foundCurrency = currencyObj.data.find((cur)=>{
            return cur.currencyCodeA.toString() === currency.number;
        })
        if(!foundCurrency){
            return ctx.reply('Currency didnt found in Monobank API');
        }else{
            //return ctx.reply(JSON.stringify(foundCurrency));
            return ctx.replyWithMarkdown (
        `Currency : *${currency.code}*
Rate Buy : *${foundCurrency.rateBuy}*
Rate Sell : *${foundCurrency.rateSell}*
            `);
        }
    } catch (err) {
        return ctx.reply(err.message);
    }
});

bot.startPolling();
