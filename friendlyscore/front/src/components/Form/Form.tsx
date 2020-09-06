import React, {FormEvent, useState} from 'react';
import {emitData} from "../../helpers/socketIO";
import {TransactionData} from "../../interfaces/personData";

interface Props {
    data: any,
    current: TransactionData
    modalShow: (e: FormEvent<HTMLFormElement>) => void
    modifyTransaction: (value: string, id: string) => void
}

const Form = (props: Props) => {
    const [value, setValue] = useState('');
    const {data, current, modalShow, modifyTransaction} = props;


    const handleChange = (event: any) => {
        setValue(event.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        modalShow(e);
        modifyTransaction(value, current.id);
        emitData(current, value);
    }

    const createOptions = (data: any) => {
        return data.map((categories: any, index: number) => <option key={`${index}-${categories}`}
                                                                    value={categories}>{categories}</option>)
    }

    const selectedOption = (current: any, data: []) => {
        return data.filter((categories: any) => categories === current.category_name)[0]
    }


    return <form onSubmit={handleSubmit}>
        <select
            className={'select-selected'}
            name="categories"
            id="categories"
            value={selectedOption(current, data)}
            onChange={handleChange}>
            {createOptions(data)}
        </select>
        <input type={'submit'}
               className={'submitButton'}
               value={'Submit'}/>
    </form>
}

export default Form;
