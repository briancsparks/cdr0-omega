
const polyPkgs = ['@cdr0/ports', '@cdr0/config'];

module.exports = require('./get-local-polyrepo')(__dirname, {polyPkgs})('@cdr0/config')       || require('@cdr0/config');
