import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import AddItem from "@/components/AddItem"
import { setItems, addItem, removeItem } from "@/reducers/itemsReducer"
import TodoItem from "./TodoItem"

export default function Todo() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.items)

  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const fetchItems = async () => {
      const accessToken = localStorage.getItem("accessToken")
      try {
        const response = await fetch("http://127.0.0.1:8000/api/items/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        if (!response.ok) {
          throw new Error("Failed to fetch items")
        }
        const data = await response.json()
        dispatch(setItems(data))
      } catch (error) {
        console.error("Failed to fetch items:", error)
      }
    }
    fetchItems()
  }, [dispatch])


  const getFilteredItems = () => {
    let sortedItems = [...items].sort((a, b) => {
      return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
    });
  
    switch (filter) {
      case "active":
        return sortedItems.filter((item) => !item.completed);
      case "completed":
        return sortedItems.filter((item) => item.completed);
      default:
        return sortedItems;
    }
  };
  

  const handleClearCompleted = async () => {
    const completedItems = items.filter((item) => item.completed)
    completedItems.forEach(async (item) => {
      await fetch(`http://127.0.0.1:8000/api/items/${item.id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      dispatch(removeItem(item.id))
    })
  }
  const filteredItems = getFilteredItems()

  return (
    <>
      <AddItem onSubmit={(data) => dispatch(addItem(data))} />

      <div className="mt-10 max-w-lg mx-auto space-y-4">
        {filteredItems.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}

        <div className="flex items-center justify-between py-4 mt-6 text-dark-slate">
          <span className="text-sm text-gray-500">
            {filteredItems.length} items left
          </span>
          <div className="space-x-1">
            <button
              onClick={() => setFilter("all")}
              className={`text-sm ${filter==='all'?'underline':""} text-gray-500 hover:text-gray-600`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`text-sm ${filter==='active'?'underline':""} text-gray-500 hover:text-gray-600`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={ `text-sm ${filter==='completed'?'underline':""} text-gray-500 hover:text-gray-600  `}
            >
              Completed
            </button>
          </div>
          <button
            onClick={handleClearCompleted}
            className={`text-sm   text-gray-500 hover:text-gray-600`}
          >
            Clear Completed
          </button>
        </div>
      </div>
    </>
  )
}
