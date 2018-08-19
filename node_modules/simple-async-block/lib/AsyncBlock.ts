//  Created by Tyler Herbert on 7/1/18.
//  Copyright © 2018 Tyler. All rights reserved.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/// Class to help track multiple async calls in a block
export class AsyncBlock {

    /// number of blocks waiting for completion
    public numberOfBlocks = 0;

    /// an array of all results from each block
    public results = [];

    /// minimum number of blocks that must start & end before completion is triggered
    public minimumBlocks = 0;

    /// if we have triggered the completion yet
    public triggeredCompletion = false;

    /// if we reach 0 blocks multiple times, allow the completion to get called again
    public allowMutipleCompletions = false;

    /// the number of calls to endBlock
    public blocksCompleted = 0;

    /// block containing the async calls
    public asyncBlock: (async) => void;

    /// the block to call when we're done
    public completion: (results) => void;

    /// call when starting an async block, so we know we're waiting for a new block
    public startBlock() {
        this.numberOfBlocks += 1;
    }

    /// appends result to the result array
    public setBlockResult(result) {
        this.results.push(result)
    }

    /// call when a block is done
    public endBlock() {
        this.blocksCompleted += 1;
        this.numberOfBlocks -= 1;

        if (this.numberOfBlocks === 0
            && (!this.triggeredCompletion || this.allowMutipleCompletions)
            && this.blocksCompleted >= this.minimumBlocks) {

            this.triggeredCompletion = true;
            this.completion(this.results)
        }
    }

    /// calls set block result then calls end block
    public endBlockWithResult(result) {
        this.setBlockResult(result);
        this.endBlock();
    }

    /// method called when `start` is triggered
    public onStart(asyncBlock) {
      this.asyncBlock = asyncBlock;
    }

    /// method called when all blocks are complete, the results are sent to this
    public onComplete(completionBlock) {
      this.completion = completionBlock;
    }

    /// calls `onStart` and sets up params
    public start() {
      this.asyncBlock(this);
    }
}
