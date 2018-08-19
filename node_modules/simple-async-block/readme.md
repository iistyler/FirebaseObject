## Overview
This allows you to specify a block of code where you do multiple asyncronous calls, and then trigger a completion block when they're all finished without having to deal with a bunch of callbacks/counting when blocks complete.

## How to use
Importing
```
import { AsyncBlock } from 'simple-async-block/AsyncBlock';
```
Making a new block
```
var asyncBlock = new AsyncBlock()
```

Set the block with the asyncronous code
```
asyncBlock.onStart((async) => {
       // Do some async stuff
})
```

for each block in that block call
```
async.startBlock() // on start
async.setBlockResult(someData) // whatever data you wanna save for that
async.endBlock() // on finish

async.encBlockWithResult(someData) // shorthand for the last two line
```
and what to do on completion
```
asyncBlock.onComplete((result) => { 
	// result contains an array of each blocks result
})
```
Then start the block
```
asyncBlock.start()
```

*Example*
```
function example() {
	var asyncBlock = new AsyncBlock()


	asyncBlock.onStart((async) => {
		// Run 100 async blocks
		for (var i = 0; i < 100; i++) {
			someFunc(async);
		}
	})

	asyncBlock.onComplete((result) => { 
		console.log("Completed", result) 
	})

	asyncBlock.start()
}

/// Sample asyncronous method
var someFunc = function(async) {

	var randomTimeout = Math.floor(Math.random() * (5 - 1 + 1) + 1);

	async.startBlock()
	setTimeout(() => {
		async.setBlockResult(randomTimeout)
		async.endBlock()
	}, randomTimeout * 100);
}
```

This will call the onComplete block and output an array of the length of time it took each of the 100 blocks to run
