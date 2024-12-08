import { useState, useEffect } from "react";
import { fetchTodos } from "../services/api";

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getTodos = async () => {
            try {
                const todosData = await fetchTodos();
                setTodos(todosData.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || "Failed to fetch todos.");
                setLoading(false);
            }
        };

        getTodos();
    }, []);

    if (loading) {
        return <div>Loading todos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Your Todos</h1>
                <ul className="space-y-6">
                    {todos.map((todo) => (
                        <li
                            key={todo._id}
                            className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl text-start font-bold text-gray-900">{todo.title}</h2>
                                    <p className="text-gray-700 mt-1">{todo.description}</p>
                                </div>
                                <span
                                    className={`px-4 py-1 text-sm font-medium rounded-full ${todo.completed
                                        ? "bg-green-100 text-green-700 border border-green-300"
                                        : "bg-red-100 text-red-700 border border-red-300"
                                        }`}
                                >
                                    {todo.completed ? "Completed" : "Pending"}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Todo;
