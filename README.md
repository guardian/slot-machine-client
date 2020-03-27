# @guardian/automat-client

A basic (JS) client for Automat. If you are reading this and don't know
what Automat is, this library is probably not useful for you.

## Local dev

### Watch for changes

```
$ yarn dev
```

### Point a project to your local version of automat-client

With [`yarn link`] you can develop against a locally checked out version of
this client:

In your local checkout of `automat-client`:

```
$ yarn link
```

And then in the project consuming the client:

```
$ yarn link "@guardian/automat-client"
```

To revert back to using the published version of the package:

```
$ yarn unlink "@guardian/automat-client"
$ yarn install --force
```

[`yarn link`]: https://classic.yarnpkg.com/en/docs/cli/link/

NOTE: Ensure you build this library before adding it locally to your project, by running `yarn build`.

## Publishing

On your feature branch, increment the version in the `package.json` file.
Once we hit version 1 we should use semver when doing this.

Once the feature branch is merged into master, run:

    yarn publish

This will build and then publish to NPM.

You can then update the clients!

Note: you'll need to be part of the @guardian org on npm to do this.\
Speak to a suitable person if you don't have access.
