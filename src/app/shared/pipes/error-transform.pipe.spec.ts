import { ErrorTransformPipe } from './error-transform.pipe';

describe('ErrorTransformPipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorTransformPipe();
    expect(pipe).toBeTruthy();
  });
});
