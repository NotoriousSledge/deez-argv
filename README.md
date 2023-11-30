# deez-argv

## A left-pad inspired package for deserializing an argument list to a Record

By default `process.argv` is passed if no argument is given.

```ts
const args = deserializeArgumentList();
// ^? Record<string, string>
```

You can also pass a custom argument list with a custom starting point

```ts
const args = deserializeArgumentList(['--foo', 'bar', '-baz=qar']);
// ^? Record<string, string>
```

You can then pass that object to any validation you desire.

```ts
const argSchema z.object({foo: z.string(), baz: z.string()});
const args = argSchema.parse(deserializeArgumentList());
```

`-` and `--` denotes an argument that should be parsed.

Obviously this library could do that for you, for the purpose of loose coupling I decided to keep this package simple for now.
