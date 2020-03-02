# @guardian/slot-machine-client

A basic (JS) client for Slot Machine. If you are reading this and don't know
what Slot Machine is, this library is probably not useful for you.

## Local dev

With yarn, you can publish in a local project if you have this library
on your local path with something like:

    yarn add file: ../slot-machine-client

(Vary depending on the relative locations of this library to the client.)

## Publishing

On your feature branch, increment the version in the `package.json` file.
Once we hit version 1 we should use semver when doing this.

Once the feature branch is merged into master, run:

    yarn publish

This will build and then publish to NPM.

You can then update the clients!

Note: you'll need to be part of the @guardian org on npm to do this.\
Speak to a suitable person if you don't have access.
