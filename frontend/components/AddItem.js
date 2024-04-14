import { useState } from 'react';

export default function AddItem({onSubmit}) {
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
       
        const accessToken = localStorage.getItem('accessToken');
        fetch('http://127.0.0.1:8000/api/items/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ title, completed }),
        })
        .then(response => response.json())
        .then(data => {
            setTitle(''); 
            setCompleted(false); 
            console.log('Item added:', data);   
            onSubmit(data); 

        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                    placeholder="Enter item title"
                    required
                />
            </div>
            <div className="mb-6 flex items-center">
                <input
                    type="checkbox"
                    id="completed"
                    checked={completed}
                    onChange={e => setCompleted(e.target.checked)}
                    className="h-4 w-4 text-dark-slate focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="completed" className="ml-2 block text-sm text-gray-900">
                    Completed
                </label>
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  text-white bg-dark-slate hover:bg-[#597a7b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#597a7b]">
                Add Item
            </button>
        </form>
    );
}
