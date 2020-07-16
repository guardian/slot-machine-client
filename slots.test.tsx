import { mountDynamic } from './slots';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { css } from '@emotion/core';

interface Props {
    name: string;
}

const Hello: React.FC<Props> = ({ name }: Props) => {
    return <div>My name is {name}!</div>;
};

const colours = (clicked: boolean) =>
    css`
        color: ${clicked ? 'green' : 'blue'};
    `;

const HelloDynamic: React.FC<Props> = ({ name }: Props) => {
    const [clicked, toggle] = useState(false);

    console.log('RENDER!' + ' ' + clicked);

    return (
        <div
            onClick={() => {
                console.log('OUCH!');
                toggle(!clicked);
            }}
            css={colours(clicked)}
        >
            My name is {name}!
        </div>
    );
};

describe('mountDynamic', () => {
    it('it should render a module using preact', () => {
        const el = document.createElement('div');
        const attachShadow = false;
        mountDynamic(el, <Hello name={'Wat'} />, attachShadow);

        const got = el.innerHTML;
        const want = '<div>My name is Wat!</div>';

        expect(got).toBe(want);
    });

    it('it should render a module into a shadow dom', () => {
        const el = document.createElement('div');
        const attachShadow = true;
        mountDynamic(el, <Hello name={'Wat'} />, attachShadow);

        const got = el.shadowRoot?.innerHTML;
        const want = '<div><div>My name is Wat!</div></div>'; // wrapper div because preact can't render directly onto shadow

        expect(got).toBe(want);
    });

    it('it should render with emotion styles into a shadow dom and just work', () => {
        const el = document.createElement('div');
        const attachShadow = true;
        mountDynamic(el, <HelloDynamic name={'Wat'} />, attachShadow);

        const styles = el.shadowRoot?.firstElementChild.querySelector('style');

        expect(styles.innerHTML).toContain('color:blue');

        /*         const div = el.shadowRoot?.firstElementChild.querySelector('div');
        div.click();
        expect(styles.innerHTML).toContain('color:green'); */
    });
});
