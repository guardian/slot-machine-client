import { mountDynamic } from './slots';
import { h } from 'preact';

interface Props {
    name: string;
}

const Hello: React.FC<Props> = ({ name }: Props) => {
    return <div>My name is {name}!</div>;
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
});
