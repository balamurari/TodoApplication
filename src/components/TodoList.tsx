import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeTodo, toggleTodo, updatePriority, type Todo } from '../store/todoSlice';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.items);
  const dispatch = useDispatch();

  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(toggleTodo(todo.id))}
              className="text-gray-500 hover:text-purple-600 transition duration-200"
            >
              {todo.completed ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </button>
            <span
              className={`text-lg ${
                todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
              }`}
            >
              {todo.text}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={todo.priority}
              onChange={(e) =>
                dispatch(
                  updatePriority({
                    id: todo.id,
                    priority: e.target.value as Todo['priority'],
                  })
                )
              }
              className={`px-3 py-1 rounded-full border ${getPriorityColor(
                todo.priority
              )} border-current`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-gray-400 hover:text-red-500 transition duration-200"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
      {todos.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No tasks yet. Add one above!
        </div>
      )}
    </div>
  );
};