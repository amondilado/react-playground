// App utils
// Helper functions
const utils = {};
// or utils.extend?
export const utils_extend = function (defaults, options) {
    var extended = {}, prop;
    for (prop in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
            extended[prop] = defaults[prop];
        }
    }
    for (prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
            extended[prop] = options[prop];
        }
    }
    console.log('_o: ',extended);
    return extended;
};

// # Date
// Formatter

export default utils;
