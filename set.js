const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUorL3BmZmg4eE1STUNHVEc3R2NJUnU5NEJadWpYNlI1ZEFFRW12MVcwbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTjFrbXNuTU4yQ1U4WGpBZTZFeG5weWpVdjhmbjA3aE9tSlR3UXVVMldsYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFREhmNjVLNjllWVVDRFhKbGNjZy9hZVUrYkpxZzVJd1d0VmVYV2tJMTJFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUUDFaSUNxdDB3L0JGWWZaWXdhMlUwaHgvSUtuUDFEWEY0Rm9lZld5cHhFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlCMWNubzlRRjlIdFhvZ2NSYWE2RXpwcHhhMWxzR3N4WjkxaElVSzdabTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJHemVENU44YksxWkszUDNsVGptUE1oTXg2SVdyVTUyUXQ0NFR2U2l3a1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0dmZTR6UVFuSTNaMTI1ZElSNEVRMzVYRmJCWXdQNThDOW51MVgyeHowTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia09FMTZXbnlLN20yeVBBRERrajdLakROUmQraTl3bW5tSDg5ckNRRC9Vaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxYT21qTHdRRmQxN3ZBUDdhdGNYYnpQOWxQd3VKU1dnNFpLb3NQS3BDZEtNcWNWR0FHMWpDMmN0SHFxWU9DNE9hbUNhd201SkUwZ2NKKzZneHh5RGpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzMsImFkdlNlY3JldEtleSI6ImsvZVhWVlZNbEVBakIyZ3dPSXQvMmhicXZyWU9zZGN0SHZkZm0wT0dQNzQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjFCWlpodG1lU3NhamFJc0pibW1tNWciLCJwaG9uZUlkIjoiNzEzZTY2NDctOGEwYS00Yzc1LWEyYzQtZDIwMjNiNTk2M2NmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlcxMUhtV29yaTNLcHNNTG1XRUxBK0hOR01WMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkcndjdEdiVFRiQU9NeGdGL0R5dDJSN0pMY1E9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTENDSjZNNTQiLCJtZSI6eyJpZCI6Ijk0NzI4ODM5NDQ2OjNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pPcmhpTVE2c0RKdEFZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IndnVDJibFp3cHFpNHJXSVV2N1ZvR1BQT2JXVnFRdDhTeTRoUGlSRk43Ulk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlUraFkyMVZzWExoay9QQnhkdTcyVDcxSjFXcFdUN09HSm95M3lJUjY3N0tIZGI5VTczcEhFY0NJcnJLVnlFck9tb1ZOOEZGdUxRN3hkZFM5bDZUUURBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJXcDNuN2t5Ly9CNC9vajVuemhBNFhueEg2Wm9NNGFUTGRCUXdnWjJIcDRzZzhLbjdHcXphVlA5bm1TUXNldGNzdnh6Mlcrak1wek9EVzMrajJmVFZnUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzI4ODM5NDQ2OjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY0lFOW01V2NLYW91SzFpRkwrMWFCanp6bTFsYWtMZkVzdUlUNGtSVGUwVyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDg2ODk4MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKZXAifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "⚔  dexter  ⚔",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "94728839446",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'DEXTER-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '10' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
