const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ArticleService = {
  getAllArticles: async () => {
    const res = await fetch(`${API_BASE}/articles`);
    if (!res.ok) throw new Error('Failed to fetch articles');
    return res.json();
  },

  createArticle: async (data) => {
    const res = await fetch(`${API_BASE}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create article');
    return res.json();
  },

  deleteArticle: async (id) => {
    const res = await fetch(`${API_BASE}/articles/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete article');
    return res.json();
  },
};

export default ArticleService;
