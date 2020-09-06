import io from "socket.io-client";
import {PersonData, TransactionData} from "../interfaces/personData";

let socket: SocketIOClient.Socket;

export const startSocket = () => {
    socket = io('http://localhost:80', {
        reconnection: true
    });
}

export const getStatus = (cb: Function) => {
    socket.on('connected', (status: string) => cb(null, status));
}

export const startPersonListener = (cb: Function) => {
    socket.on('newUser', (person: PersonData) => cb(null, person));
}

export const stopSocket = () => {
    console.log('disconnected');
    socket.disconnect();
}

export const emitData = (currentTransaction: TransactionData,value: any) => {
    const {name, person_id, id} = currentTransaction;
    const object = {person_id, transaction_id: id, category_name: value, name};
    socket.emit('modifiedTransaction', object);
}


