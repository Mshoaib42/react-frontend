import { useState } from "react";
import { createTodo } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateTodo = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const todoData = {
                userId,
                ...formData,
            };
            await createTodo(todoData, token);
            setSuccess("Todo created successfully!");
            setTimeout(() => {
                navigate("/home");
            }, 2000); // Redirect to todos after 2 seconds
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create todo.");
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white p-6 rounded shadow"
            >
                <h2 className="text-xl font-bold mb-4">Create Todo</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Create Todo
                </button>
            </form>
        </div>
    );
};

export default CreateTodo;
