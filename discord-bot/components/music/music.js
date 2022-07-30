const prefix = require('../../prefix/prefix-check.js')
const help = require('./actions/help.js')
const search = require('./actions/search.js')
const skip = require('./actions/skip.js')
const forceskip = require('./actions/forceskip.js')
// const find = require('./actions/find.js')

module.exports = async (msg,serverQueue) =>{
    try{

        const command = prefix(msg)

        switch(command){
            case 'play': 
                await search(msg,serverQueue)
                break
            case 'skip':
                await skip(msg,serverQueue)
                break
            case 'forceskip':
                await forceskip(msg,serverQueue)
                break
            case 'help':
                await help(msg)
                break
        }
    }
    catch(err){
        console.log(err)
        msg.reply({content: 'ПипяО, я походу залагал'})
        return
    }
}