import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [
            {
                id: '1a2b3c4d-5678-90ef-ghij-klmnopqrstuv',
                title: 'Buy groceries',
                description: 'Milk, Bread, Eggs, and Vegetables',
                priority: 'high'
            },
            {
                id: '1a2b3c4d-5678-90ef-ghij-klmnopqrstuw',
                title: 'Finish project report',
                description: 'Complete the report for the Q3 project',
                priority: 'medium'
            },
            {
                id: '1a2b3c4d-5678-90ef-ghij-klmnopqrstux',
                title: 'Book flight tickets',
                description: 'Book tickets for the family trip to Hawaii',
                priority: 'high'
            },
            {
                id: '1a2b3c4d-5678-90ef-ghij-klmnopqrstuy',
                title: 'Schedule doctor appointment',
                description: 'Annual check-up and consultation',
                priority: 'low'
            },
            {
                id: '1a2b3c4d-5678-90ef-ghij-klmnopqrstuz',
                title: 'Prepare for presentation',
                description: 'Practice slides and gather materials',
                priority: 'medium'
            },
            {
                id: '1a2b3c4d-5678-90ef-ghij-klmnopqrstva',
                title: 'Clean the house',
                description: 'Living room, kitchen, and bathroom deep clean',
                priority: 'low'
            },
            {
                id: '1a2b3c4d-5678-90ef-ghij-klmnopqrstvb',
                title: 'Read a book',
                description: 'Finish reading "The Great Gatsby"',
                priority: 'medium'
            },
            {
                id: '1a2b3c4d-5678-90ef-ghij-klmnopqrstvc',
                title: 'Call mom',
                description: 'Catch up and see how she’s doing',
                priority: 'high'
            },
            {
                id: '1a2b3c4d-5678-90ef-ghij-klmnopqrstvd',
                title: 'Update resume',
                description: 'Add recent work experience and skills',
                priority: 'medium'
            },
            {
                id: '1a2b3c4d-5678-90ef-ghij-klmnopqrstve',
                title: 'Plan weekend getaway',
                description: 'Research locations and activities',
                priority: 'low'
            },
        ],
    },
    reducers: {
        addTodo: (state, action) => {
            const { title, description, priority, id, todoStatus } = action.payload;
            state.todos.push({ title, description, priority, id, todoStatus });
        },
        DeleteTodo: (state, payload) => {
            const newTodos = state.todos.filter((item) => item.id !== payload.payload);
            return {
                ...state, todos: newTodos,
            };
        },
        UpdatedTodo: (state, action) => {
            const { id, title, description, priority } = action.payload;
            const index = state.todos.findIndex(todo => todo.id === id);

            if (index !== -1) {
                state.todos[index] = {
                    ...state.todos[index],
                    title,
                    description,
                    priority,
                };
            }
        },
        toggleCompleted: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        }
    },
});

export const { addTodo, DeleteTodo, UpdatedTodo, toggleCompleted } = todoSlice.actions;

export default todoSlice.reducer;
