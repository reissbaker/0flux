'use strict';

import DispatcherIndex = require('./dispatcher-index');
import ActionDispatcher = require('./action-dispatcher');
import leafNode = require('./leaf-node');
import LeafNode = leafNode.LeafNode;

export interface ContainerOptions {
  maxHistory?: number;
  deepEquals?: boolean;
}

export interface HistoryEntry<State> {
  node: LeafNode<State, any>;
  state: State;
}

export class Container {
  private _nodes: LeafNode<any, any>[] = [];
  private _history: HistoryEntry<any>[][] = [];
  private _historyIndex = -1;
  private _maxHistory: number;
  private _dispatcher: DispatcherIndex;
  private _deepEqualsDefault: boolean;

  constructor(opts: ContainerOptions = {}) {
    this._maxHistory = opts.hasOwnProperty("maxHistory") ? opts.maxHistory : 0;
    this._deepEqualsDefault = opts.hasOwnProperty("deepEquals") ? opts.deepEquals : true;
  }

  dispatcher<DispatcherImpl extends DispatcherIndex>(impl: DispatcherImpl): DispatcherImpl {
    if(this._dispatcher) throw new Error('Already initialized dispatcher.');

    this._dispatcher = impl;
    this._nodes.forEach((node) => {
      node._bind(impl);
    });

    return impl;
  }

  action<Data>(): ActionDispatcher<Data> {
    return new ActionDispatcher<Data>(this);
  }

  state<State, DispatcherImpl extends DispatcherIndex>(bind: leafNode.bindFn<State, DispatcherImpl>) {
    return this._nodeBuilder<State, DispatcherImpl>(bind, this._deepEqualsDefault);
  }

  deepState<State, DispatcherImpl extends DispatcherIndex>(bind: leafNode.bindFn<State, DispatcherImpl>) {
    return this._nodeBuilder(bind, true);
  }

  shallowState<State, DispatcherImpl extends DispatcherIndex, Data>(bind: leafNode.bindFn<State, DispatcherImpl>) {
    return this._nodeBuilder(bind, false);
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

  private _nodeBuilder<State, DispatcherImpl extends DispatcherIndex>(
    bind: leafNode.bindFn<State, DispatcherImpl>,
    deepEquals: boolean
  ) {
    const node = new LeafNode({
      bind,
      deepEquals: this._deepEqualsDefault
    });
    this._nodes.push(node);

    // FIXME: can we rearchitect to avoid the type cast here?
    if(this._dispatcher) node._bind(this._dispatcher as DispatcherImpl);

    return node;
  }

}

