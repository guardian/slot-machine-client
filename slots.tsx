import { Metadata } from './types';
import { h } from 'preact';
import { render, JSX } from 'preact/compat';
import * as emotion from '@emotion/core';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';

const apiURL = 'https://contributions.guardianapis.com/epic';

export const getBodyEnd = (meta: Metadata, url: string = apiURL): Promise<Response> => {
    const json = JSON.stringify(meta);
    return fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: json,
    });
};

declare global {
    interface Window {
        automat: { renderElement: Function; emotionCore: any };
    }
}

// mountDynamic mounts a react (preact) element to a DOM element.
//
// To save resources, Automat provides Preact's renderElement and @emotion/core out of the box.
// Modules should alias imports for these to use the provided versions. See
// types of the global `automat` object for exact details here.
export const mountDynamic = (
    el: HTMLElement,
    component: JSX.Element,
    attachShadow = false,
): void => {
    if (!window.automat) {
        window.automat = { renderElement: h, emotionCore: emotion };
    }

    if (!attachShadow || !el.attachShadow) {
        render(component, el);
        return;
    }

    // configure emotion
    const shadowRoot = el.attachShadow({ mode: 'open' });
    const inner = shadowRoot.appendChild(document.createElement('div'));
    const emotionCache = createCache({ container: inner });

    render(<CacheProvider value={emotionCache}>{component}</CacheProvider>, inner);
};
