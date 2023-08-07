describe('Reservations', () => {
  let jwt: string;

  beforeAll(async () => {
    const user = {
      email: 'sleeprnestapp972@gmail.com',
      password: 'StrongPassword123!@',
    };

    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    jwt = await response.text();
  });

  test('Create', async () => {
    const response = await fetch('http://reservations:3000/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: jwt,
      },
      body: JSON.stringify({
        startDate: '08-19-2023',
        endDate: '09-01-2023',
        placeId: '123',
        invoiceId: '123',
        charge: {
          amount: 40,
          card: {
            cvc: '314',
            exp_month: 8,
            exp_year: 2024,
            number: '4242424242424242',
          },
        },
      }),
    });

    expect(response.ok).toBeTruthy();
    const reservations = await response.json();
    console.log(reservations);
  });
});
