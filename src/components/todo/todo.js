import { Button } from '../button/button';
import { useTodos } from '../../state-manager';
import { NEW_TODO_ID, KEYBOARD } from '../../constants';
import styles from './todo.module.css';
export const Todo = ({ id, title, completed }) => {
 const { editingTodo, setEditingTodo, saveTodo, removeTodo, toggleTodo, isLoading } = useTodos();
 const isEditing = editingTodo.id === id;
 const beginEdit = () => setEditingTodo({ id, title });
 const cancel = () => { if (id === NEW_TODO_ID) removeTodo(id); setEditingTodo({ id: null, title: '' }); };
 const onKeyDown = event => { if (event.key === KEYBOARD.ENTER) saveTodo(id, editingTodo.title, completed); if (event.key === KEYBOARD.ESCAPE) cancel(); };
 return <div className={styles.todo}>
  <input className={styles.checkbox} type="checkbox" disabled={isEditing || isLoading || id === NEW_TODO_ID} checked={!!completed} onChange={event => toggleTodo(id, event.target.checked)} />
  <div className={styles.title}>{isEditing ? <input autoFocus type="text" disabled={isLoading} value={editingTodo.title} onChange={event => setEditingTodo(current => ({...current, title:event.target.value}))} onKeyDown={onKeyDown} /> : <div onClick={beginEdit}>{title}</div>}</div>
  <div>{isEditing ? <><Button onClick={() => saveTodo(id, editingTodo.title, completed)}>✓</Button><Button onClick={cancel}>✖</Button></> : <><Button onClick={beginEdit}>✎</Button><Button onClick={() => removeTodo(id)}>✖</Button></>}</div>
 </div>;
};
