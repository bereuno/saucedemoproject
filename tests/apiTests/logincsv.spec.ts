import { test, expect } from '../fixtures/csvFixture';

test('Should login to the API correctly', async ({ request, credentials }) => {

  for (const credential of credentials) {
    const loginApi = await request.post('https://restful-booker.herokuapp.com/auth', {
      data: {
        username: credential.username,
        password: credential.password
      }
    });

    const {token} = await loginApi.json()

    expect(loginApi.status()).toBe(200);
    
  }
});