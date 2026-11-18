import { useEffect } from 'react';
import { useTodos } from '../../../../state-manager';
import styles from './search.module.css';
export const Search = () => {
 const { searchInput, setSearchInput, setSearchPhrase } = useTodos();
 useEffect(() => { const timer = setTimeout(() => setSearchPhrase(searchInput), 500); return () => clearTimeout(timer); }, [searchInput, setSearchPhrase]);
 const onSubmit = event => { event.preventDefault(); setSearchPhrase(searchInput); };
 return <form className={styles.search} onSubmit={onSubmit}><input className={styles.input} value={searchInput} placeholder="Поиск..." onChange={event => setSearchInput(event.target.value)} /></form>;
};
