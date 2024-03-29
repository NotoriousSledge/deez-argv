# deez-argv

## A left-pad inspired package for deserializing an argument list to a Record

Install via the plethora of available package managers!!!!

```bash
$ npm i deez-argv
```

```bash
$ yarn add deez-argv
```

```bash
$ pnpm add deez-argv
```

```bash
$ bun i deez-argv
```

By default `process.argv` is passed if no argument is given.

```ts
const args = deserializeArgumentList();
// ^? Record<string, string>
```

You can also pass a custom argument list with a custom starting point

```ts
const args = deserializeArgumentList(['--foo', 'bar', '-baz=qar'], 0);
// ^? Record<string, string>
```

The starting point otherwise defaults to `2` for compatibility with `process.argv`.

You can then pass that object to whatever validation you desire.

```ts
const argSchema = z.object({foo: z.string(), baz: z.string()});
const args = argSchema.parse(deserializeArgumentList());
// ^? {foo:string, baz:string}
```

`-` and `--` denotes an argument that should be parsed.
If an argument is followed by another argument, it is assumed to be a boolean flag.
Otherwise values can be passed either with a `=` or with a space.
You can use commas to pass multiple values into an array.

```bash
$ node index.js --foo bar -biz --baz=qar --qux --shows interstellar,bum, pirates
```

```js
const args = deserializeArgumentList();
// ^? Record<string, string>
assert.deepStrictEqual(args, {
  foo: 'bar',
  biz: true,
  baz: 'qar',
  qux: true,
  shows: ['interstellar', 'bum', 'pirates'],
});
```

Obviously this library could handle validation and mapping for you, kind of like the Rust `Clap`-crate,
but for now it's just a simple deserializer.
