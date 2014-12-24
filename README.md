# Advisable Trait (Experimental)
## A [CocktailJS](http://cocktailjs.github.io) Trait Extension

This trait experiment aims to add AOP advices into Classes.
The methods `around`, `after` and `before` are available on host classes or objects.

See example.js file for some examples.

## Update
This experiment has been moved to [https://github.com/CocktailJS/cocktail-trait-advisable](https://github.com/CocktailJS/cocktail-trait-advisable) repository and it is being maintained there.


## Install

````bash

npm install git://github.com/CocktailJS/lab-trait-advisable.git --save

````

## Usage

Once dependency is installed, the trait module name is a bit different.

> Test.js

```js
var cocktail  = require('cocktail'),
    Advisable = require('cocktail-trait-advisable');

cocktail.mix({
    '@exports': module,
    '@as': 'class',

    '@traits': [Advisable],

    constructor: function(options) {
        var after = options.after;
        this.param = options.param;
        
        if (after){
            this.after(after.method, after.advice);
        }

        this.initialize();
    },

    initialize: function() {
        console.log('Test initialize');
    },

    get: function() {
        console.log('Test get');
    }
});

```

**Note**: The module name is `cocktail-trait-advisable` just to follow the name convention for CocktailJS extensions.  
  
Then in index.js we can use our Test.js class:

> index.js

```js
var Test = require('./Test'),
    test;


var test = new Test({
    param: 'param',
    after: {
        method: 'get',
        advice: function() {
            console.log('test after get');
        }
    }
});

test.get();

```


## Try the example

Clone this repo and install dependencies

````bash

git clone git@github.com:CocktailJS/lab-trait-advisable.git 
cd lab-trait-advisable
npm install

````

Now just execute example.js

````bash

node example.js

````