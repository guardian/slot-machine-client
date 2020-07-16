// Required as @emotion/core doesn't seem to play well with Preact
// unfortunately.

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace preact.JSX {
    interface HTMLAttributes {
        css?: any;
    }
}
