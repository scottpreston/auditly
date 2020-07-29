# Demo

This demo project is used to show how auditly can create a graph of vulnerabilities in your dependencies.

## Demo `package.json`

The `package.json` found here should be used to add packages with known vulnerabilities.  Most of these will be older packages that have long since been patched.  These packages WILL NOT end up in the published auditly NPM package.  Indeed the entire demo folder will not be included with the install.

## Usage

Install local auditly and vulnerable dependencies.
```sh
npn install
```

Generate Auditly Files
```sh
npx auditly
```

Files will be generated at `demo/auditly-output`.

## Development

This demo project is intended for use during development.  When changes are made to the auditly code, `npm install` will need to be run in the demo again to update the demo's local code.

Packages with known vulnerabilities can be added to the `dependencies` section of the `package.json`.  The version numbers should be exact matches and not prefixed with `~` or `^`.
