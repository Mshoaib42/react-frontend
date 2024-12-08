import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth";

// Function to handle user sign-up
export const signupUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response; // Return the response data
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

// Function to handle user login
export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response; // Return the response data
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

const TODOS_API_URL = "http://localhost:5001/api/todos/";

export const fetchTodos = async () => {
  try {
    const response = await axios.get(TODOS_API_URL);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const createTodo = async (data) => {
  try {
    const response = await axios.post(TODOS_API_URL, data);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
