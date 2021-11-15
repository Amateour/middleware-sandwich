import {method} from '../../build/validator';

test('method', async () => {
    const reqMethod: string = await method(["POST", "GET", "DELETE"], "POST");
    expect(reqMethod).toBe("POST");
})