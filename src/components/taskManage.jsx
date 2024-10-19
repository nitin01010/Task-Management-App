import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, DeleteTodo, toggleCompleted } from '../features/todoSlice';
import { Trash2, Pen } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const TaskManage = () => {
    const [task, setTask] = useState({
        id: '',
        title: '',
        description: '',
        priority: '',
    });
    const [filter, setFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // State for the search query

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.todo.todos);

    const HandleInputs = (e) => {
        const { name, value } = e.target;
        setTask(values => ({ ...values, [name]: value }));
    };

    const HandleSubmit = () => {
        if (!task.title || !task.description || !task.priority) {
            toast.error('All fields are required!');
            return;
        }
        const { title, description, priority } = task;
        dispatch(addTodo({ title, description, priority, id: uuidv4(), completed: false }));

        toast.success('Task added successfully!');
        setTask({
            id: '',
            title: '',
            description: '',
            priority: '',
        });
    };

    const HandleDelete = (id) => {
        dispatch(DeleteTodo(id));
        toast.success('Task deleted successfully!');
    };

    const HandleEdit = (id) => {
        navigate(`/todo/${id}`);
    };

    const HandleToggle = (id) => {
        dispatch(toggleCompleted(id));
        toast.success('Task updated successfully!');
    };

    // Filter data based on priority and search query
    const filteredData = data
        .filter(item => {
            const matchesPriority = filter ? item.priority === filter : true;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesPriority && matchesSearch;
        });

    return (
        <>
            <div className='p-2 flex flex-col items-center flex-wrap justify-center m-6 gap-6'>
                {/* Input Fields */ }
                <input
                    type="text"
                    value={ task.title }
                    onChange={ HandleInputs }
                    name='title'
                    className='bg-white w-[100%] text-lg md:w-[50%] py-3 rounded-[8px] text-black px-7 outline-none'
                    placeholder='Type title .... '
                />
                <input
                    type="text"
                    value={ task.description }
                    onChange={ HandleInputs }
                    name="description"
                    className='bg-white w-[100%] text-lg md:w-[50%] py-3 rounded-[8px] text-black px-7 outline-none'
                    placeholder='Type description ....'
                />
                <input
                    type="text"
                    value={ task.priority }
                    onChange={ HandleInputs }
                    name='priority'
                    className='bg-white w-[100%] text-lg md:w-[50%] py-3 rounded-[8px] text-black px-7 outline-none'
                    placeholder='Type priority ....'
                />
                <button onClick={ HandleSubmit } className='w-[100%] md:w-[50%] py-3 rounded-[8px]'>Submit</button>
            </div>

            {/* Search Bar */ }
            <div className='flex p-3 w-[93%] -mt-5 md:w-[49%] m-auto'>
                <input
                    type="text"
                    value={ searchQuery }
                    onChange={ (e) => setSearchQuery(e.target.value) }
                    className='bg-white text-black w-[100%] rounded-md py-3 px-3 text-xl'
                    placeholder='Search by title or description...'
                />
            </div>

            <div className='flex p-3 w-[93%] -mt-5 md:w-[49%] m-auto '>
                <select
                    value={ filter }
                    onChange={ (e) => setFilter(e.target.value) }
                    className='bg-white text-black w-[100%] rounded-md py-3 px-3 text-xl '
                >
                    <option value=''>All</option>
                    <option value='high'>High</option>
                    <option value='medium'>Medium</option>
                    <option value='low'>Low</option>
                </select>
            </div>

            <div className='flex flex-col gap-6'>
                { filteredData.map((item) => (
                    <div key={ item.id } className={ `bg-white relative rounded-[8px] text-black p-3 w-[90%] md:w-[47%] m-auto ${item.completed ? 'line-through' : ''}` }>
                        <p className='text-2xl mb-2 font-bold'><b>{ item.title }</b></p>
                        <p className='text-base md:text-lg'>{ item.description }</p>
                        <div className='flex justify-between'>
                            <span className='flex gap-4 mt-5'>
                                { item.priority === 'high' && <p className='uppercase font-bold text-red-600'><b>High</b></p> }
                                { item.priority === 'medium' && <p className='uppercase font-bold text-yellow-400'><b>Medium</b></p> }
                                { item.priority === 'low' && <p className='uppercase font-bold text-green-400'><b>Low</b></p> }
                            </span>
                            <span className='flex gap-6 mt-5'>
                                <p className='uppercase animate-wiggle animate-infinite animate-ease-in font-bold' onClick={ () => HandleDelete(item.id) }><b><Trash2 /></b></p>
                                <p className='uppercase animate-wiggle animate-infinite animate-ease-in font-bold' onClick={ () => HandleEdit(item.id) }><b><Pen /></b></p>
                                <p className='uppercase animate-wiggle animate-infinite animate-ease-in font-bold' onClick={ () => HandleToggle(item.id) }><b>{ item.completed ? 'Undo' : 'Complete' }</b></p>
                            </span>
                        </div>
                    </div>
                )) }
                <br />
                <br />
                <br />
            </div>
        </>
    );
};

export default TaskManage;
