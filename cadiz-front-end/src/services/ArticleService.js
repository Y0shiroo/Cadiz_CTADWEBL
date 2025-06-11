// src/services/ArticleService.js
import axios from 'axios';

// ✅ Set full API base URL using environment variable
const BASE_URL = import.meta.env.VITE_LOCAL_HOST || 'http://localhost:5000'; // fallback for dev
const API_URL = `${BASE_URL}/api/articles`; // ✅ CHANGED: previously was just '/api/articles'

const getAllArticles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getArticleById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createArticle = async (articleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, articleData, config);
  return response.data;
};

const updateArticle = async (id, articleData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put(`${API_URL}/${id}`, articleData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

const deleteArticle = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const ArticleService = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};

export default ArticleService;
