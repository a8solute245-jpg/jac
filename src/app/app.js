import { useEffect } from 'react';
import { ControlPanel, Todo } from '../components';
import { useTodos } from '../state-manager';
import styles from './app.module.css';
export const App = () => {
 const { todos, loadTodos, searchPhrase, isAlphabetSorting, isLoading } = useTodos();
 useEffect(() => { loadTodos(searchPhrase, isAlphabetSorting); }, [loadTodos, searchPhrase, isAlphabetSorting]);
 return <div className={styles.app}><ControlPanel /><div>{todos.map(todo => <Todo key={todo.id} {...todo} />)}</div>{isLoading && <p style={{textAlign:'center'}}>Загрузка...</p>}</div>;
};
