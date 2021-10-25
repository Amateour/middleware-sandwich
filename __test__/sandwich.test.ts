import * as SWCH from '../functions'
import {Sandwich, Sandwiches} from '../index';

const UserScheme = {
  email: {type: Sandwich.String, required: true, strict: true},
  password: {type: Sandwich.String, required: true, strict: true, min: 8}
}

test('args validation errors', async () => {
  const Snak = new Sandwiches(true, UserScheme);

  try {
    await Snak.parser_schemes({
      email: "test@sandwich.com",
      password: "123",
    });
  } catch (error) {
    const {message} : any = error;
    expect(message).toBe('args_validation_errors');
  }
});

test('validation success', async () => {
  const Snak = new Sandwiches(true, {
    email: {type: Sandwich.String, required: true, strict: true},
    password: {type: Sandwich.String, required: true, strict: true, min: 8}
  });
  
  const resp0: SWCH.ParserSchemesResponse = await Snak.parser_schemes({
    email: "test@sandwich.com",
    password: "12345678",
  });
  
  expect(resp0.args.email.valueOf()).toBe("test@sandwich.com");
  expect(resp0.args.password.valueOf()).toBe("12345678");
  expect(resp0.message).toBe("args_validation_successful");

  Snak.value_of = false;

  const resp1: SWCH.ParserSchemesResponse = await Snak.parser_schemes({
    email: "test@sandwich.com",
    password: "12345678",
  });

  expect(resp1.args.email).toBe("test@sandwich.com");
  expect(resp1.args.password).toBe("12345678");
  expect(resp1.message).toBe("args_validation_successful");
});

test('HTTP POST request is not allowed', async () => {
  class Users extends Sandwich.Req(UserScheme) {}
  const handler = Sandwich.handler(Users);
  const hadler_request_post = async () => {
    return await handler({
      body: {
        email: "test@sandwich.com",
        password: "12345678",
      },
      method: 'POST',
    }, null);
  };
  expect.assertions(1);
  await hadler_request_post().catch(error => expect(error.message).toMatch('HTTP POST request is not allowed'));
});

test('HTTP POST request is allowed', (done) => {
  class Users extends Sandwich.Req(UserScheme) {
    async post() {
      try {
        const resp: SWCH.ParserSchemesResponse = await this.parser_schemes();
        expect(resp.message).toBe("args_validation_successful");
        done();
      } catch (error) {
        done(error)
      }
    }
  }
  const handler = Sandwich.handler(Users);
  const hadler_request_post = async() => {
    try {
      await handler({
        body: {
          email: "test@sandwich.com",
          password: "12345678",
        },
        method: 'POST',
      }, null);
    } catch (error) {
      done(error);
    }
  };
  hadler_request_post();
});
