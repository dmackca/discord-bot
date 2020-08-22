const gifGenerator = require('frinkiac-gif-generator');

gifGenerator('bee bit my bottom')
    .then((gif) => {
        console.log(gif);
    })
    .catch(console.error);
