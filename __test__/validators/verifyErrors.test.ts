import Sandwich, {Validators} from "../../build";
import {verifyErrors} from "../../build/validator";

test('args validation errors', async () => {
    const Snack = new Validators({
        email: {type: Sandwich.String, required: true, strict: true},
        password: {type: Sandwich.String, required: true, strict: true, min: 8}
    });

    try {
        await Snack.parserSchemes({
            email: "test@sandwich.com",
            password: "123",
        });
    } catch (error) {
        const {message} : any = error;
        expect(message).toBe('args_validation_errors');
    }
    expect.assertions(1);
});

test('args verify errors', async () => {
    try {
        await verifyErrors({
            password: {
                errors: [ { message: 'minimum_characters', value: 8 } ],
                success: false,
                value: '123'
            }
        });
    } catch (error) {
        const {message} : any = error;
        expect(message).toBe('args_validation_errors');
    }
    expect.assertions(1);
});