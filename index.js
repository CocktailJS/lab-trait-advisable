
'use strict';

var cocktail     = require('cocktail'),
	Configurable = require('cocktail-trait-configurable'),
	Advisable    = require('./lib/Advisable');

var MyClass,
 	obj;

MyClass = cocktail.mix({
	'@as': 'class',

	'@traits' : [Advisable, Configurable],

	'@static' : {
		create: function (options) {
			return new this(options);
		}
	},

	constructor: function (options) {
		this.configure(options);
		this.initialize();
	},


	setAfter: function (options) {
		var k,v;
		for (k in options){
			v = options[k];
			this.after(k, v);
		}
	},

	setBefore: function (options) {
		var k,v;
		for (k in options){
			v = options[k];
			this.before(k, v);
		}
	},

	setAround: function (options) {
		var k,v;
		for (k in options){
			v = options[k];
			this.around(k, v);
		}
	},

	initialize: function () {
		console.log('initialize');
	},

	doSomething: function (withParams) {
		console.log('do something with: ' + (withParams ? withParams : 'no parameters'));
	},

	echo: function (param) {
		return param;
	},

	hmm: function(params) {
		console.log( this.echo(params) );
	}
});


obj = MyClass.create({
	before: {
		'echo': function(param) {
			if (param instanceof Object) {
				param.modifiedValue = JSON.stringify(param);
			}
		}
	},
	after: {
		'initialize': function(){
			console.log('right after init')
		},
		'doSomething': function (withParams) {
			console.log('After doSomething!');
		}
	}
});


// --- BEFORE

obj.before(
	'doSomething',
	function(withParams) {
		 console.log('Calling with Params: '+ (withParams ? 'YES' : 'NO'));
	}
);

obj.doSomething();

obj.doSomething('Yeahh!');

console.log(obj.echo('echo string'));
console.log(obj.echo({a: 'value'}));


// --- AROUND

obj.around('hmm', function(method, params) {
	if (typeof params[0] === 'string'){
		method.apply(this, params);
	}

});

obj.hmm('hhhhhh'); // prints in console

obj.hmm({v: 1}, 'adasdasd'); // do not prints
