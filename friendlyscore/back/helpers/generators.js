const faker = require('faker')

const categories = [
    'groceries', 'medicine', 'gambling', 'tech'
]

exports.randomPersonDataGenerator = () => {
    return {
        id: faker.random.uuid(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        credit_score: generateRandomNumber(1, 100),
        email: faker.internet.email()
    }
}

exports.randomTransactionDataGenerator = (person_id) => {
    return {
        id: faker.random.uuid(),
        person_id,
        amount: faker.finance.amount(),
        name: faker.company.companyName("company.companySuffix"),
        category_name: randomCategory(),
    }
}

const randomCategory = () => {
    const index = Math.floor(Math.random() * (0 + (categories.length - 1)));

    return categories[index];
}

const generateRandomNumber = exports.generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max + min));
}
