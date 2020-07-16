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
        mountDynamic(el, <Hello name={'Wat'} />, false);

        const got = el.innerHTML;
        const want = '<div>My name is Wat!</div>';

        expect(got).toBe(want);
    });
});
