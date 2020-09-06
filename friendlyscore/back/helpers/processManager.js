const generators = require("./generators");

let session = [];
// startProcess interval init to clearInterval in Observable unsubscribe
let interval;


class Observable {
    constructor(exec) {
        this.listeners = new Set;
        exec({
            next: (value) => this.listeners.forEach(({next}) => next && next(value)),
            error: (err) => this.listeners.forEach(({error}) => error && error(err)),
            complete: () => this.listeners.forEach(({complete}) => complete && complete())
        });
    }

    subscribe(listeners) {
        this.listeners.add(listeners);
        return {
            unsubscribe: () => {
                clearInterval(interval);
                this.listeners.delete(listeners)
            }
        }
    }
}


exports.startProcess = () => {
    return new Observable(({next}) => {
        const randomInterval = generators.generateRandomNumber(5, 30) * 1000;
        interval = setInterval(() => {
            const person = generators.randomPersonDataGenerator()
            person.transaction = [];

            const randomTransaction = generators.generateRandomNumber(1, 5);

            for (let i = 0; i < randomTransaction; i++) {
                person.transaction.push(generators.randomTransactionDataGenerator(person.id))
            }

            console.log('user generated');
            next(person);
        }, randomInterval)
    });
}

exports.emitData = (socket, person) => {
    socket.emit('newUser', person);

    socket.request.complete && session.push(person);
}

exports.startRecieving = (socket) => {
    socket.on('modifiedTransaction', (data) => {
        modifyData(socket, data);
    });
}

exports.clearData = () => {
    session = [];
}

const modifyData = (socket, data) => {
    if (!session) {
        return;
    }

    try {
        const indexOfPerson = session.findIndex((person) => person.id === data.person_id)
        const indexOfTransaction = session[indexOfPerson].transaction.findIndex((transaction) => transaction.id === data.transaction_id);

        session[indexOfPerson].transaction[indexOfTransaction].category_name = data.category_name;
        console.log(`Category ${data.category_name} applied for transaction ${data.transaction_id}, person ${data.person_id}`);
                socket.emit('status', 'success');
    } catch (e) {
        socket.emit('status', 'error');
    }
}
