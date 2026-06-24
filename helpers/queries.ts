import {getConnection} from '../tests/fixtures/dbconnection';

export async function getCustomerById() {
    const conn = await getConnection();
    const[rows] = await conn.execute('SELECT * FROM customers WHERE id = ?', [12]);
    await conn.end();
    return rows;
};

export async function updateCustomerData(firstName: string){
    const conn = await getConnection();
    const [result] = await conn.execute('UPDATE customers SET first_name = ? WHERE id = ?', ['Berenice', 2]);
    await conn.end();
    return result;
};

export async function createCustomer(first_name: string, last_name: string, gender: string, phone_number:number){
    const conn = await getConnection();
    const [result] = await conn.execute('INSERT INTO customers (first_name, last_name, gender, phone_number) VALUES (?, ?, ?, ?)', [first_name, last_name, gender, phone_number]);
    await conn.end();
    return result;
};

export async function deleteCustomer(){
    const conn = await getConnection();
    const [result] = await conn.execute('DELETE FROM customers WHERE id = ?', [25]);
    await conn.end();
    return result;
};

export async function customersAndOrdersMade(){
    const conn = await getConnection();
    const [result] = await conn.execute(`SELECT * FROM customers INNER JOIN orders ON customers.id = orders.customer_id`);
    await conn.end();
    return result;
};

export async function getAverageCoffeePrice(){
    const conn = await getConnection();
    const [result] = await conn.execute('SELECT AVG(price) FROM products');
    await conn.end();
    return result;
};

export async function howManyBoughtCustomer(){
    const conn = await getConnection();
    const [result] = await conn.execute('SELECT product_id, customer_id FROM orders GROUP BY product_id, customer_id HAVING customer_id = ?', [10]);
    await conn.end();
    return result;
};

export async function sortCoffeePriceWithSubquery(){
    const conn = await getConnection();
    const [result] = await conn.execute('SELECT name, price FROM products WHERE price IN (SELECT id FROM products WHERE price > 3.00)');
    await conn.end();
    return result;
};

export async function gettingCoffeePriceWithCte(){
    const conn = await getConnection();
    const [result] = await conn.execute('WITH cte_coffee AS (SELECT name, price FROM products WHERE price IN (SELECT id FROM products WHERE price < 3.00)) SELECT * FROM cte_coffee');
    await conn.end();
    return result;
};



