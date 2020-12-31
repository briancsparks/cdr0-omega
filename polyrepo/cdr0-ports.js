
// module.exports = require('./get-local-polyrepo')(__dirname)('@cdr0/ports');


const polyPkgs = ['@cdr0/ports', '@cdr0/config'];

module.exports = require('./get-local-polyrepo')(__dirname, {polyPkgs})('@cdr0/ports')       || require('@cdr0/ports');
