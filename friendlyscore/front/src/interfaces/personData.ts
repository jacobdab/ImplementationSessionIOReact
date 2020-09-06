export interface PersonData {
    id: string,
    name: string,
    email: string,
    credit_score: number,
    transaction: TransactionData[],
    transactionVisible: boolean
}

export interface TransactionData {
    id: string,
    person_id: string,
    name: string,
    amount: number,
    category_name: string
}
