// @ts-check
import $ from 'node:test';
import {deserializeArgumentList} from './index.js';
import assert from 'node:assert';

await $.test('deez-argv', async () => {
  await $.describe('deserializeArguments', async () => {
    await $.it('should deserialize arguments', () => {
      const args = deserializeArgumentList([
        '',
        '',
        '--foo',
        'bar',
        '--baz=qux',
      ]);
      assert.deepStrictEqual(args, {foo: 'bar', baz: 'qux'});
    });

    await $.it('should work with both one and two dashes', () => {
      const args = deserializeArgumentList([
        '',
        '',
        '-foo',
        'bar',
        '--baz=qux',
      ]);
      assert.deepStrictEqual(args, {foo: 'bar', baz: 'qux'});
    });

    await $.it('should be able to customize start index', () => {
      const args = deserializeArgumentList(['-foo', 'bar', '--baz=qux'], 0);
      assert.deepStrictEqual(args, {foo: 'bar', baz: 'qux'});
    });
  });
});
