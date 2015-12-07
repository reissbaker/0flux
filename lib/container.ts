'use strict';

import DispatcherIndex = require('./dispatcher-index');
import ActionDispatcher = require('./action-dispatcher');
import leafNode = require('./leaf-node');
import LeafNode = leafNode.LeafNode;

const DEFAULT_HISTORY_LENGTH = 0;

export interface ContainerOptions {
  maxHistory?: number;
}

interface HistoryEntry<State> {
  node: LeafNode<State>;
  state: State;
}

export class Container {
  private _nodes: LeafNode<any>[] = [];
  private _history: HistoryEntry<any>[][] = [];
  private _historyIndex = -1;
  private _maxHistory: number;

  constructor(opts: ContainerOptions = {}) {
    this._maxHistory = opts.hasOwnProperty("maxHistory") ? opts.maxHistory : DEFAULT_HISTORY_LENGTH;
  }

  action<Data>(): ActionDispatcher<Data> {
    return new ActionDispatcher<Data>(this);
  }

  state<State>(bind: leafNode.bindFn<State>) {
    const node = new LeafNode(bind);
    this._nodes.push(node);
    return node;
  }

  snapshot<State>(): void {
    if(this._maxHistory <= 0) return;

    const snapshot: HistoryEntry<any>[] = this._nodes.map((node) => {
      return {
        node,
        state: node.current
      };
    });


    this._history.push(snapshot);
    this._historyIndex = this._history.length - 1;

    if(this._maxHistory >= this._history.length) {
      this._history.shift();
      this._historyIndex--;
    }
  }
}

