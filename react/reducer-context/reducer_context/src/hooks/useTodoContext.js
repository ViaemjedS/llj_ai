import {TodoContext} from '../TodoContext';
import {useContext} from 'react';
export function useTodoContext() {
    return useContext(TodoContext);
}