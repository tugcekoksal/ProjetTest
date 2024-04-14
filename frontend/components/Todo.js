import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import AddItem from "@/components/AddItem"
import {
  setItems,
  addItem,
  updateItem,
  removeItem,

} from "@/reducers/itemsReducer"


export default function Todo() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.items)
  const [editingItemId, setEditingItemId] = useState(null)
  const [editFormData, setEditFormData] = useState({
    title: "",
    completed: false,
  })
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    const fetchItems = async () => {
      const accessToken = localStorage.getItem('accessToken'); 
      try {
        const response = await fetch("http://127.0.0.1:8000/api/items/", {
          headers: {
            'Authorization': `Bearer ${accessToken}`  
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        dispatch(setItems(data));
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    fetchItems();
  }, [dispatch]);
  
  const getFilteredItems = () => {
    switch (filter) {
      case 'active':
        return items.filter(item => !item.completed);
      case 'completed':
        return items.filter(item => item.completed);
      default:
        return items;
    }
  };
  

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    setEditFormData({
      ...editFormData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleStartEditing = (id) => {
    const item = items.find((item) => item.id === id)
    setEditingItemId(id)
    setEditFormData({
      title: item.title,
      completed: item.completed,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const accessToken = localStorage.getItem('accessToken'); 
    if (editingItemId !== null) {
      fetch(`http://127.0.0.1:8000/api/items/${editingItemId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(editFormData),
      })
        .then((response) => response.json())
        .then((updatedItem) => {
          dispatch(updateItem({  id: editingItemId, 
            newTitle: updatedItem.title, 
            newCompleted: updatedItem.completed  }))
          setEditingItemId(null)
          setEditFormData({ title: "", completed: false })
        })
        .catch((error) => {
          console.error("Failed to update item:", error)
        })
    }
  }

  const handleDeleteItem = (id) => {
    const accessToken = localStorage.getItem('accessToken');
    fetch(`http://127.0.0.1:8000/api/items/${id}/`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${accessToken}`  
    }
    })
      .then((response) => {
        if (response.ok) {
          dispatch(removeItem(id))
        }
      })
      .catch((error) => console.error("Failed to delete item:", error))
  }
  const handleClearCompleted = async () => {
    const completedItems = items.filter(item => item.completed);
    completedItems.forEach(async item => {
      await fetch(`http://127.0.0.1:8000/api/items/${item.id}/`, { method: "DELETE" });
      dispatch(removeItem(item.id));  
    });
  };
  const filteredItems = getFilteredItems();

  return (
  
     
        <>
        
          <AddItem onSubmit={(data) => dispatch(addItem(data))} />

          <div className="mt-10 max-w-lg mx-auto space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  item.completed ? "bg-[#EBD9B4]" : "bg-white"
                }`}
              >
             
                {editingItemId === item.id ? (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-grow items-center space-x-4"
                  >
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleInputChange}
                      className="flex-grow border-2 border-gray-200 text-black rounded px-2 py-1"
                      autoFocus
                    />
                    <input
                      type="checkbox"
                      name="completed"
                      value={editFormData.completed}
                      checked={editFormData.completed}
                      onChange={handleInputChange}
                      className="ml-4 w-5 h-5 text-[#9CAFAA] rounded-full"
                    />
                
       

                    <button
                      type="submit"
                      className="bg-dark-slate hover:bg-muted-green text-white font-bold py-2 px-4 rounded"
                    >
                      Save
                    </button>
                  </form>
                ) : (
                  <>
                    <span
                      className={`${
                        item.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-700 "
                      } flex-grow `}
                    >
                      {item.title}
                    </span>
                    <button
                      onClick={() => handleStartEditing(item.id)}
                      className="text-sm text-white bg-dark-slate hover:bg-[#597a7b] font-bold py-2 px-4 rounded mr-5"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-sm text-dark-slate hover:bg-[#D6DAC8] font-bold py-2 px-4 rounded"
                    >
                      X
                    </button>
                  </>
                )}
              </div>
            ))}

            <div className="flex items-center justify-between py-4 mt-6 text-dark-slate">
              <span className="text-sm text-gray-500">
                {filteredItems.length} items left
              </span>
              <div className="space-x-1">
                <button onClick={() => setFilter('all')} className="text-sm text-gray-500 hover:text-gray-600">
                  All
                </button>
                <button onClick={() => setFilter('active')} className="text-sm text-gray-500 hover:text-gray-600">
                  Active
                </button>
                <button  onClick={() => setFilter('completed')} className="text-sm  text-gray-500 hover:text-gray-600">
                  Completed
                </button>
              </div>
              <button onClick={handleClearCompleted} className="text-sm text-gray-500 hover:text-gray-600">
                Clear Completed
              </button>
            </div>
           
          </div>
        </>


  )
}
