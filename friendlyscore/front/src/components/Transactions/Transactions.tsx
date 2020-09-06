import React, {FormEvent, useState} from 'react';
import {TransactionData} from "../../interfaces/personData";

import './Transactions.scss';
import Modal from "../Modal/Modal";
import Form from "../Form/Form";


interface Props {
    transaction: TransactionData
    modifyTransaction: (value: string, id: string) => void
}

const categories = [
    'groceries',
    'medicine',
    'gambling',
    'tech'
]

const Transactions = (props: Props) => {
    const {transaction, modifyTransaction} = props;
    const [isModalVisible, setVisibility] = useState<boolean>(false);




    const modalShow = (e: React.MouseEvent<HTMLLIElement | HTMLDivElement, MouseEvent> | FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setVisibility((isModalVisible: boolean) => !isModalVisible);
    }


    return transaction &&
        <>
            <div className={'transactionContainer'}>
                <li
                    className={'transactionItem'}
                    onClick={modalShow}>
            <span className={'transactionItem__content'}>
                <small className={'transactionItem__label'}>Transaction ID</small>
                {transaction.id}
                </span>
                    <span className={'transactionItem__content'}>
                <small className={'transactionItem__label'}>Person ID</small>
                        {transaction.person_id}
                </span>
                    <span className={'transactionItem__content'}>
                <small className={'transactionItem__label'}>Transaction Name</small>
                        {transaction.name}
                </span>
                    <span className={'transactionItem__content'}>
                <small className={'transactionItem__label'}>Amount</small>
                        {transaction.amount}
                </span>
                    <span className={'transactionItem__content category'}>
                <small className={'transactionItem__label'}>Category Name</small>
                        {transaction.category_name}
                </span>
                </li>
            </div>
            <Modal show={isModalVisible} modalShow={modalShow}>
                <Form data={categories}
                      current={transaction}
                      modalShow={modalShow}
                      modifyTransaction={modifyTransaction}/>
            </Modal>
        </>
}


export default Transactions;
