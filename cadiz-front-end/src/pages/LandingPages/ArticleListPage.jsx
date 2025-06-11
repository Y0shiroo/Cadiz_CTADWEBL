import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Alert, Box } from '@mui/material';
import ArticleList from '../../components/ArticleList';
import ArticleService from '../../services/ArticleService';

function ArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      const data = await ArticleService.getAllArticles();
      // Only show articles that are active
      const activeArticles = data.filter(article => article.active === true);
      setArticles(activeArticles);
    } catch (err) {
      setError('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();

    // Set up polling to check for new/updated articles every 30 seconds
    const interval = setInterval(fetchArticles, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Articles
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && articles.length === 0 && (
        <Alert severity="info">No active articles available.</Alert>
      )}

      {!loading && !error && articles.length > 0 && (
        <ArticleList articles={articles} />
      )}
    </Container>
  );
}

export default ArticleListPage;