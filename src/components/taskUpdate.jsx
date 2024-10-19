import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdatedTodo } from '../features/todoSlice';
import { toast } from 'react-toastify';

const TaskUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const data = useSelector((state) => state.todo.todos);

    const taskToUpdate = data.find((item) => item.id === id);
    const { title, description, priority, id: newid } = taskToUpdate;

    const [task, setTask] = useState({
        title: title,
        description: description,
        priority: priority,
        id: newid
    });

    const HandleInputs = (e) => {
        const { name, value } = e.target;
        setTask((values) => ({ ...values, [name]: value }));
    };

    const HandleSubmit = () => {
        if (!task.title || !task.description || !task.priority) {
            toast.error('All fields are required!');
            return;
        }
        const { title, description, priority, id } = task;
        dispatch(UpdatedTodo({ title, description, priority, id }));
        toast.success('Task updated successfully!');
        navigate("/");
    };

    return (
        <div className='p-2 flex flex-col items-center flex-wrap justify-center m-6 gap-6'>
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
            <button onClick={ HandleSubmit } className='w-[100%] md:w-[50%] py-3 rounded-[8px]'>Update</button>
        </div>
    );
};

export default TaskUpdate;
