import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { createTodo as createTodoRequest, deleteTodo as deleteTodoRequest, readTodos, updateTodo as updateTodoRequest } from './api';
import { NEW_TODO_ID } from './constants';

const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState({ id: null, title: '' });
  const [searchInput, setSearchInput] = useState('');
  const [searchPhrase, setSearchPhrase] = useState('');
  const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadTodos = useCallback(async (phrase = searchPhrase, sorting = isAlphabetSorting) => {
    setIsLoading(true);
    try { setTodos(await readTodos(phrase, sorting)); }
    finally { setIsLoading(false); }
  }, [searchPhrase, isAlphabetSorting]);

  const addDraft = useCallback(() => {
    setTodos(current => [{ id: NEW_TODO_ID, title: '', completed: false }, ...current]);
    setEditingTodo({ id: NEW_TODO_ID, title: '' });
  }, []);
  const saveTodo = useCallback(async (id, title, completed = false) => {
    if (!title.trim()) {
      if (id === NEW_TODO_ID) setTodos(current => current.filter(todo => todo.id !== NEW_TODO_ID));
      else await removeTodo(id);
      setEditingTodo({ id: null, title: '' }); return;
    }
    setIsLoading(true);
    try {
      if (id === NEW_TODO_ID) {
        const created = await createTodoRequest({ title: title.trim(), completed });
        setTodos(current => [created, ...current.filter(todo => todo.id !== NEW_TODO_ID)]);
      } else {
        await updateTodoRequest({ id, title: title.trim() });
        setTodos(current => current.map(todo => todo.id === id ? { ...todo, title: title.trim() } : todo));
      }
      setEditingTodo({ id: null, title: '' });
    } finally { setIsLoading(false); }
  }, []);
  const removeTodo = useCallback(async (id) => {
    if (id !== NEW_TODO_ID) await deleteTodoRequest(id);
    setTodos(current => current.filter(todo => todo.id !== id));
    setEditingTodo(current => current.id === id ? { id: null, title: '' } : current);
  }, []);
  const toggleTodo = useCallback(async (id, completed) => {
    setIsLoading(true);
    try { await updateTodoRequest({ id, completed }); setTodos(current => current.map(todo => todo.id === id ? { ...todo, completed } : todo)); }
    finally { setIsLoading(false); }
  }, []);

  const value = useMemo(() => ({ todos, editingTodo, setEditingTodo, searchInput, setSearchInput, searchPhrase, setSearchPhrase, isAlphabetSorting, setIsAlphabetSorting, isLoading, loadTodos, addDraft, saveTodo, removeTodo, toggleTodo }), [todos, editingTodo, searchInput, searchPhrase, isAlphabetSorting, isLoading, loadTodos, addDraft, saveTodo, removeTodo, toggleTodo]);
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos must be used inside TodoProvider');
  return context;
};
