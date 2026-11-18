import { Button } from '../button/button';
import { Search, Sorting } from './components';
import { useTodos } from '../../state-manager';
import styles from './control-panel.module.css';
export const ControlPanel = () => { const { addDraft } = useTodos(); return <div className={styles.controlPanel}><Search /><Sorting /><Button onClick={addDraft}>✚</Button></div>; };
