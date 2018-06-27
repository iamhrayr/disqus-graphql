const fs = require('fs');

// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
fs.readdirSync(__dirname + '/').forEach(function(file) {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
        const name = file.replace('.js', '');
        exports[name] = require('./' + file);
    }
});
