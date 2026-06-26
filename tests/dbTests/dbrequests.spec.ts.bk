const { test, expect } = require('@playwright/test');
const { getConnection } = require ('../fixtures/dbconnection');
import { getCustomerById, updateCustomerData, createCustomer, deleteCustomer, customersAndOrdersMade, getAverageCoffeePrice, howManyBoughtCustomer, sortCoffeePriceWithSubquery, gettingCoffeePriceWithCte } from "../../helpers/queries";

test.describe('Queries using the workbench database coffee_store', () => {

    test('verificar datos en BD antes del test', async () => {
    const conn = await getConnection();
    const rows = await conn.execute('SELECT * FROM customers');
    console.log(rows);

    await conn.end();
    });

    test('Customer is displayed correctly', async () => {
        const rows = await getCustomerById()
        console.log(rows)
        expect(rows).toBeTruthy();
    });

    test('Customer data is updated correctly', async () => {
        const result = await updateCustomerData('Berenice')
        console.log(result)
        expect(result).toBeTruthy();
    });

    test('Create a new customer', async () => {
        const result = await createCustomer('Sara','Villa', 'F', 4432354455)
        console.log(result)
        expect(result).toBeTruthy();
    });

    test('Customer is removed from customers table', async () => {
        const result = await deleteCustomer()
        console.log(result)
        expect(result).toBeTruthy();
    });

    test('All orders made by customer are displayed', async () => {
        const result = await customersAndOrdersMade()
        console.log(result)
        expect(result).toBeTruthy();
    });

    test('The average coffee price is calculated', async () => {
        const result = await getAverageCoffeePrice()
        console.log(result)
        expect(result).toBeTruthy();
    });

    test('How many coffee bought a customer', async () => {
        const result = await howManyBoughtCustomer()
        console.log(result)
        expect(result).toBeTruthy();
    });

    test('Coffee is sorted by price, using subquery', async () => {
        const result = await sortCoffeePriceWithSubquery()
        console.log(result)
        expect(result).toBeTruthy();
    });

    test('Coffee is sorted by price, using CTE', async () => {
        const result = await gettingCoffeePriceWithCte()
        console.log(result)
        expect(result).toBeTruthy();
    });
});







