import React, {useEffect, useState} from 'react';
import People from "../../components/Person/Person";
import {getStatus, startPersonListener, startSocket, stopSocket} from "../../helpers/socketIO";
import './Dashboard.scss'
import {PersonData} from "../../interfaces/personData";


const Dashboard = () => {
    const [persons, setPersons] = useState<PersonData[]>([]);


    useEffect(() => {
        startSocket();
        getStatus((err: Error, status: string) => {
            if (status === 'connected') {
                setPersons([]);
            }
        })

        return () => stopSocket();
    }, []);


    useEffect(() => {
        startPersonListener((err: Error, person: PersonData) => {
            const newPersons = persons.concat([person]);
            setPersons(newPersons);
        })
    }, [persons]);

    const PeopleList =
        (<ul>
                {persons.map((person: PersonData, index: number) => {
                    return <People key={person.id}
                                   people={person}
                                />
                })}
            </ul>
        )


    return (<div className={'Dashboard'}>
        {persons.length > 0 ? PeopleList
            :
            <span className={'placeholder'}>
                Persons don't exist
            </span>}
    </div>)
}


export default Dashboard;
