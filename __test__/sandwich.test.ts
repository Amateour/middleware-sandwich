import {ParserSchemesResponse} from '../functions';
import Sandwich, {Validators, Resource} from '../build';

const UserScheme = {
  email: {type: Sandwich.String, required: true, strict: true},
  password: {type: Sandwich.String, required: true, strict: true, min: 8}
}

test('validation success', async () => {
  const Snack = new Validators(UserScheme);

  const validate = async () => {
    const resp0: ParserSchemesResponse = await Snack.parserSchemes({
      email: "test@sandwich.com",
      password: "12345678",
    });

    expect(resp0.args.email.valueOf()).toBe("test@sandwich.com");
    expect(resp0.args.password.valueOf()).toBe("12345678");
    expect(resp0.message).toBe("args_validation_successful");


    Snack.valueOf = false;

    const resp1: ParserSchemesResponse = await Snack.parserSchemes({
      email: "test@sandwich.com",
      password: "12345678",
    });

    expect(resp1.args.email).toBe("test@sandwich.com");
    expect(resp1.args.password).toBe("12345678");
    expect(resp1.message).toBe("args_validation_successful");
  }

  await validate();
});


test('HTTP POST request is not allowed', async () => {
  class Users extends Resource {
    static parser = new Validators(UserScheme);
  }
  const handler = Sandwich.handler(Users);
  const handler_request_post = async () => {
    return await handler({
      body: {
        email: "test@sandwich.com",
        password: "12345678",
      },
      method: 'POST',
    }, null);
  };
  expect.assertions(1);
  await handler_request_post().catch(error => {
    expect(error.message).toMatch('HTTP POST request is not allowed')
  });
});

test('HTTP POST request is allowed', (done) => {
  class Users extends Resource {
    static parser = new Validators(UserScheme);
    async post(req: any) {
      try {
        const resp: ParserSchemesResponse = await Users.parser.parserSchemes(req.body);
        expect(resp.message).toBe("args_validation_successful");
        done();
      } catch (error) {
        done(error)
      }
    }
  }
  const handler = Sandwich.handler(Users);
  const handler_request_post = async() => {
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
  handler_request_post();
});
