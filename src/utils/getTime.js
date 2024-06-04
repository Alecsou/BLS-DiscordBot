const { time } = require("discord.js");

module.exports = async () => {
    const apiUrl = "http://worldtimeapi.org/api/timezone/Europe/Berlin"
    var timejson;
    await fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        timejson=data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
    return timejson;
}