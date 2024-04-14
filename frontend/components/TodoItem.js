import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateItem, removeItem } from "@/reducers/itemsReducer"

export default function TodoItem({ item }) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editFormData, setEditFormData] = useState({
    title: item.title,
    completed: item.completed,
  })

  const handleCheckboxChange = async () => {
    const updatedItem = { ...item, completed: !item.completed }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/items/${item.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(updatedItem),
        }
      )
      if (!response.ok) throw new Error("Failed to update item")
      const data = await response.json()
      dispatch(
        updateItem({
          ...data,
          newTitle: data.title,
          newCompleted: data.completed,
        })
      )
    } catch (error) {
      console.error("Failed to update item:", error)
    }
  }

  const handleStartEditing = () => {
    setIsEditing(true)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEditFormData({ ...editFormData, [name]: value })
  }

  const handleSaveEdit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/items/${item.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(editFormData),
        }
      )
      if (!response.ok) throw new Error("Failed to update item")
      const data = await response.json()
      dispatch(
        updateItem({
          id: data.id,
          newTitle: data.title,
          newCompleted: data.completed,
        })
      )
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update item:", error)
    }
  }

  const handleCancelEdit = () => {
    setEditFormData({ title: item.title, completed: item.completed })
    setIsEditing(false)
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/items/${item.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      if (!response.ok) throw new Error("Failed to delete item")
      dispatch(removeItem(item.id))
    } catch (error) {
      console.error("Failed to delete item:", error)
    }
  }

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg ${
        item.completed ? "bg-[#EBD9B4]" : "bg-white"
      }`}
    >
      <label className="custom-checkbox-label mr-4">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={handleCheckboxChange}
          className="hidden"
        />
        <span className="custom-checkbox"></span>
      </label>
      {isEditing ? (
        <form
          onSubmit={handleSaveEdit}
          className="flex flex-grow items-center space-x-4 "
        >
          <input
            type="text"
            name="title"
            value={editFormData.title}
            onChange={handleInputChange}
            className="flex-grow border-2 border-gray-200 text-black rounded px-2 py-1"
            autoFocus
          />
          <button
            type="submit"
            className="bg-dark-slate hover:bg-[#597a7b] text-white text-sm py-1 px-3 rounded"
          >
            Save
          </button>
          <button
            onClick={handleCancelEdit}
            type="button"
            className="bg-[#BE7B72] hover:bg-[#ab6f67] text-white text-sm py-1 px-3 rounded"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="flex-grow flex items-center">
          <span
            onClick={handleStartEditing}
            className={`${
              item.completed ? "text-gray-400 line-through" : "text-gray-700"
            } flex-grow cursor-pointer`}
          >
            {item.title}
          </span>
          <button
            onClick={handleDelete}
            className="text-sm text-dark-slate hover:bg-[#D6DAC8] font-bold py-2 px-4 rounded"
          >
            X
          </button>
        </div>
      )}
    </div>
  )
}
