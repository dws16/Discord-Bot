exports.run = (client, message) => {
  const str = 'mmorpg xiv'
  const pattern = new RegExp("\\b" + str.replace(/ +/g, "\\b.*\\b") + "\\b", "i")
   if(message.content.match(pattern)){
     message.delete()
   }
}