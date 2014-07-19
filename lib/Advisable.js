'use strict';

var cocktail = require('cocktail');

cocktail.mix({
    '@exports': module,
    '@as'     : 'class',

    after: function (method, advice){
        var base = this[method];

        if (base) {
            this[method] = function _advicedAfter() {
                var ret = base.apply(this, arguments);
                advice.apply(this, arguments);
                return ret;
            };
        }
    },

    before: function (method, advice){
        var base = this[method];

        if (base) {
            this[method] = function _advicedBefore() {
                advice.apply(this, arguments);
                return base.apply(this, arguments);
            };
        }

    },

    around: function (method, advice){
        var base = this[method];

        if (base) {
            this[method] = function _adviceAround() {
                var args = [].concat(arguments);
                args.unshift(base.bind(this));
                return advice.apply(this, args);
            };
        }
    }

});
