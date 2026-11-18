import { Button } from '../../../button/button';
import { useTodos } from '../../../../state-manager';
import styles from './sorting.module.css';
export const Sorting = () => { const { isAlphabetSorting, setIsAlphabetSorting } = useTodos(); return <Button onClick={() => setIsAlphabetSorting(value => !value)}><span className={styles.label}>{isAlphabetSorting ? 'A↓' : 'По дате'}</span></Button>; };
