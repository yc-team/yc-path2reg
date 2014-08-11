'use strict';

module.exports = function(path, keys){

    var result;

    keys = keys || [];

    //eg: /user/:name
    ///user/:name/?
    path = path.concat('/?')
               .replace(/\/\(/g, '/(?:')
               .replace(/([\/\.])/g, '\\$1')
               .replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g, function(match, slash, format, key, capture, star, optional) {
                    slash = slash || '';
                    format = format || '';
                    capture = capture || '([^/'+ format +']+?)';
                    optional = optional || '';

                    //push values to keys
                    keys.push({
                        name: key,
                        optional: !!optional
                    });

                    return ''
                        + (optional ? '' : slash)
                        + '(?:'
                        + format + (optional ? slash : '') + capture
                        + (star ? '((?:[\\/' + format + '].+?)?)' : '')
                        + ')'
                        + optional;


               }).replace(/\*/g, '(.*)');

    //'/a?*&*'.replace(/\*/g, '(.*)')
    //'/a?(.*)&(.*)'           


    //return regexp
    result = new RegExp('^' + path + '$');

    return result;
};