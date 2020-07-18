//https://github.com/marak/say.js/

const say = require('say');
const _ = require('lodash');

async function logger(string) {
    return new Promise(resolve => {
        say.speak(string, null, null, (err) => {
            resolve();
        });
    })
}

//run the app
runApp('Rob');

async function runApp(name) {
    const todos = [];
    const done = [];

    await addToTodoList(todos, 'Clean the bathroom',name);
    await addToTodoList(todos, 'Wash my face', name);
    await addToTodoList(todos, 'Eat my breakfast', name);
    await addToTodoList(todos, 'Slep again!!!', name);
    console.log('todos', todos)

    //let's mark the todo list as done
    await doneTodoList(done, todos[0], name);
    await doneTodoList(done, todos[1], name);
    await doneTodoList(done, todos[2], name);
    await console.log('done', done)

    let remaining = await getRemainingTodos(todos, done, name);
    console.log('remaining', remaining)
}

async function addToTodoList(todos, todo, name) {   
    todos.push(todo);
    await logger(`Adding ${todo} to your todo list, ${name}`);
}

async function doneTodoList(doneList, todo, name) {
    doneList.push(todo);
    await logger(`You just finished ${todo}, I'll mark it as done, ${name}`);
}

async function getRemainingTodos(todos, done, name) {
    let remaining = _.filter(todos, todo => {
        return !done.includes(todo);
    });

    if (remaining && remaining.length > 0) {
        await logger(`You still have ${remaining.length} remaining todos, ${name}`);
    } else {
        await  logger(`You've done a good job today '${name}`)
    }

    return remaining;
}