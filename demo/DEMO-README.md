# Demo

This demo project is used to show how auditly can create a graph of vulnerabilities in your dependencies.

#### DO THIS FIRST: Rename all .example files to .json.

## Demo `package.json`

The `package.json` found here should be used to add packages with known vulnerabilities.  Most of these will be older packages that have long since been patched.  These packages WILL NOT end up in the published auditly NPM package.  Indeed the entire demo folder will not be included with the install.

## Usage

### Install local auditly and vulnerable dependencies.
```sh
npm install
```
__NOTE:__ When using `auditly: file:..` in the `package.json` > `dependecies` section, npm creates a symlink to that directory.  As a result, any changes will be automatically picked up.

### Generate Auditly Files
```sh
npx auditly
```

Files will be generated at `demo/auditly-output`.

## Development

This demo project is intended for use during development.  Packages with known vulnerabilities can be added to the `dependencies` section of the `package.json`.  The version numbers should be exact matches and not prefixed with `~` or `^`.
