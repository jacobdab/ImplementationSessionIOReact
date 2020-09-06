import React, {useState} from 'react';
import {PersonData, TransactionData} from "../../interfaces/personData";

import './Person.scss';
import Transactions from "../Transactions/Transactions";

export interface Props {
    people: PersonData
}

const Person = (props: Props) => {
    const {people} = props;

    const [isTransactionVisible, setVisibility] = useState(false);


    const clickHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.preventDefault();
        setVisibility((isTransactionVisible: boolean) => !isTransactionVisible);
    }

    const modifyTransaction = (value: string, id: string) => {
        const indexOfChangedTransaction = people.transaction.findIndex((transaction) => transaction.id === id);
        people.transaction[indexOfChangedTransaction].category_name = value;
    }

    const TransactionList =
        (<ul>
                {people.transaction.length > 0 && people.transaction.map((transaction: TransactionData) => {
                    return <Transactions key={transaction.id}
                                         transaction={transaction}
                                         modifyTransaction={modifyTransaction}/>
                })}
            </ul>
        )

    return <>
        <li className={'personItem'} onClick={clickHandler}>
            <span className={'personItem__content id'}>
                                <small className={'personItem__label'}>Person ID</small>
                {people.id}
        </span>
            <span className={'personItem__content name'}>
                                <small className={'personItem__label'}>Name</small>
                {people.name}
        </span>
            <span className={'personItem__content email'}>
                                <small className={'personItem__label'}>Email</small>
                {people.email}
        </span>
            <span className={'personItem__content creditScore'}>
                                <small className={'personItem__label'}>Score</small>
                {people.credit_score}
        </span>
        </li>
        {people.transaction.length > 0 && isTransactionVisible && TransactionList}
    </>
}

export default React.memo(Person);
