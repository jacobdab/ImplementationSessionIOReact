const io = require('socket.io')(80);

const {startProcess, emitData, startRecieving, clearData} = require("./helpers/processManager");


io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('connected', 'connected');

    const startSubscription = startProcess().subscribe(({
            next: (person) => {
                emitData(socket, person);
            }
        })
    )

    startRecieving(socket);

    socket.once('disconnect', () => {
        console.log('user disconnected');
        startSubscription.unsubscribe();
        clearData();
    })
});
