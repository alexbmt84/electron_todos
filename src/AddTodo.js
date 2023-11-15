import React, {useState} from 'react';

const AddTodo = ({ createTodo }) => {
    const [value, setValue] = useState('');

    const add = () => {
        createTodo(value);
        setValue('');
    }

        return (
            <div className="create-todo">
                <input type="text"
                       value={value}
                       placeholder="What should I do?"
                       onChange={(e) => {setValue(e.target.value)}}/>

                <button onClick={add}>ADD</button>
            </div>
        )
}

export default AddTodo;