import { Targeting } from '../types';

interface CompareMeta {
    targeting: Targeting;
    expectedTest: string;
    expectedVariant: string;
}

const apiURL = 'https://contributions.guardianapis.com/epic/compare-variant-decision';

// Temporary helper to evaluate our variant logic server-side
// No useful response expected (so discard).
export const compareVariantDecision = (
    meta: CompareMeta,
    url: string = apiURL,
): Promise<Response> => {
    const json = JSON.stringify(meta);
    return fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: json,
    });
};
