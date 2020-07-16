import { Metadata } from './types';
import { h } from 'preact';
import { render, JSX } from 'preact/compat';

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
        automat: { renderElement: Function };
    }
}

// mountDynamic mounts a react (preact) element to a DOM element. The component
// must use window.automat.renderElement as the render element function.
export const mountDynamic = <A>(
    el: HTMLElement,
    component: JSX.Element,
    attachShadow = false,
): void => {
    if (!window.automat?.renderElement) {
        window.automat = { renderElement: h };
    }

    if (!attachShadow || !el.attachShadow) {
        render(component, el);
        return;
    }

    const shadowRoot = el.attachShadow({ mode: 'open' });
    const inner = shadowRoot.appendChild(document.createElement('div'));
    render(component, inner);
};
