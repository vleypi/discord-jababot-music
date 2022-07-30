module.exports = prefix = (msg) =>{
    if(msg.content[0] === '-'){
        const command = msg.content.split(' ', 2);
        return command[0].toLowerCase().slice(1)
    }
    else{
        return null
    }
}
