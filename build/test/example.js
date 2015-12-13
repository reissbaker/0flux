'use strict';
var flux = require('../index');
var app = new flux.App();
var dispatcher = {
    addTodo: app.action(),
    removeTodo: app.action(),
};
var todoStore = app.store(function (builder) {
    builder.reduce(dispatcher.addTodo, function (state, todoAction) {
        return {
            todos: state.todos.concat([todoAction])
        };
    });
    builder.reduce(dispatcher.removeTodo, function (state, todoAction) {
        return {
            todos: state.todos.filter(function (item) { return item.id !== todoAction.id; })
        };
    });
    return {
        todos: []
    };
});
var julia = dispatcher.addTodo.dispatch({
    id: 0,
    name: 'julia'
});
var clone = dispatcher.addTodo.dispatch({
    id: 1,
    name: 'evil julia clone'
});
todoStore.watch(function (state) {
    console.log('saw new state:', state);
});
console.log('evil clone detected:');
console.log('current state:', todoStore.state);
console.log('eliminating evil clone:');
dispatcher.removeTodo.dispatch(clone);
console.log('evil clone eliminated:');
console.log('current state:', todoStore.state);
