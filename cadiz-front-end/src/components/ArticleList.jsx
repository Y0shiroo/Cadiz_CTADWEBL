import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { format } from 'date-fns';

export default function ArticleList({ articles }) {
  return (
    <Grid container spacing={3}>
      {articles.map((article) => (
        <Grid item gridSize={{ xs: 12, sm: 6, md: 4 }} key={article._id}>
          <Link 
            to={`/articles/${article._id}`} 
            style={{ textDecoration: 'none' }}
          >
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h6" 
                  component="h2" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'primary.main',
                    minHeight: 64,
                  }}
                >
                  {article.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mb: 2, minHeight: 60 }}
                >
                  {article.content?.slice(0, 120)}
                  {article.content?.length > 120 ? '...' : ''}
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    mt: 'auto'
                  }}
                >
                  <Typography variant="subtitle2" color="primary">
                    By {article.author}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {article.createdAt 
                      ? format(new Date(article.createdAt), 'MMM d, yyyy')
                      : 'Date not available'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}