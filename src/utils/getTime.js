// module.exports = async () => {
//     const apiUrl = "http://worldtimeapi.org/api/timezone/Europe/Berlin"
//     var timejson;
//     await fetch(apiUrl)
//     .then(response => {
//         if (!response.ok) {
//         throw new Error('Network response was not ok');
//         }
//         return response.json();
//     }).then(data => {
//         timejson=data;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
//     return timejson;
// }

const {DateTime} = require('luxon');

module.exports = async () => {
    let date = DateTime.now().setZone("UTC+2");
    let unix = date.toUnixInteger();

    return {datetime:date.toString(),unixtime:unix};
}