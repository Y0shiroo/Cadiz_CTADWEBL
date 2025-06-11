import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Switch,
  Typography,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArticleService from '../../services/ArticleService';

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    author: '',
    active: false
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await ArticleService.getAllArticles();
      setArticles(data);
    } catch (err) {
      setError('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      setLoading(true);
      // Create the update payload
      const updateData = {
        active: !currentStatus
      };
      
      // Update the article in the database
      await ArticleService.updateArticle(id, updateData, token);
      
      // Update local state after successful database update
      setArticles(prevArticles => 
        prevArticles.map(article => 
          article._id === id 
            ? { ...article, active: !currentStatus }
            : article
        )
      );
    } catch (err) {
      console.error('Error updating article status:', err);
      setError('Failed to update article status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    try {
      const article = await ArticleService.getArticleById(id);
      setNewArticle(article);
      setOpenDialog(true);
    } catch (err) {
      setError('Failed to fetch article details');
    }
  };

  const handleOpenDialog = () => {
    setNewArticle({
      title: '',
      content: '',
      author: '',
      active: false
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      if (newArticle._id) {
        await ArticleService.updateArticle(newArticle._id, newArticle, token);
      } else {
        await ArticleService.createArticle(newArticle, token);
      }
      handleCloseDialog();
      fetchArticles();
    } catch (err) {
      setError('Failed to save article');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: '#f8f9fa' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: '#1a237e' }}>
              Articles
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Manage your articles and control their visibility
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              py: 1,
              bgcolor: '#1a237e',
              '&:hover': {
                bgcolor: '#0d47a1',
              },
            }}
          >
            Add Article
          </Button>
        </Box>
      </Paper>

      <TableContainer 
        component={Paper} 
        sx={{ 
          width: '100%',
          borderRadius: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '& .MuiTable-root': {
            minWidth: '100%',
          },
          '& .MuiTableCell-root': {
            px: 2,
            py: 1.5,
            whiteSpace: 'nowrap',
          },
          '& .MuiTableHead-root': {
            bgcolor: '#f5f5f5',
          },
          '& .MuiTableRow-root:hover': {
            bgcolor: '#f8f9fa',
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="20%" sx={{ fontWeight: 600, color: '#1a237e' }}>Name</TableCell>
              <TableCell width="40%" sx={{ fontWeight: 600, color: '#1a237e' }}>Title</TableCell>
              <TableCell align="center" width="20%" sx={{ fontWeight: 600, color: '#1a237e' }}>Active</TableCell>
              <TableCell align="center" width="20%" sx={{ fontWeight: 600, color: '#1a237e' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((article) => (
                <TableRow key={article._id}>
                  <TableCell sx={{ color: '#424242' }}>{article.author}</TableCell>
                  <TableCell sx={{ color: '#424242' }}>{article.title}</TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={article.active || false}
                      onChange={() => handleToggleActive(article._id, article.active)}
                      color="primary"
                      disabled={loading}
                      inputProps={{ 'aria-label': 'toggle article active status' }}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#1a237e',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#1a237e',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Article">
                      <IconButton
                        onClick={() => handleEdit(article._id)}
                        disabled={loading}
                        size="small"
                        sx={{
                          color: '#1a237e',
                          '&:hover': {
                            bgcolor: 'rgba(26, 35, 126, 0.1)',
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={articles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: '1px solid #e0e0e0',
            bgcolor: '#f8f9fa',
          }}
        />
      </TableContainer>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: '#f8f9fa', 
          color: '#1a237e',
          fontWeight: 600,
          borderBottom: '1px solid #e0e0e0'
        }}>
          {newArticle._id ? 'Edit Article' : 'Add New Article'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="title"
              label="Title"
              fullWidth
              value={newArticle.title}
              onChange={handleInputChange}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#1a237e',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1a237e',
                },
              }}
            />
            <TextField
              name="author"
              label="Author"
              fullWidth
              value={newArticle.author}
              onChange={handleInputChange}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#1a237e',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1a237e',
                },
              }}
            />
            <TextField
              name="content"
              label="Content"
              fullWidth
              multiline
              rows={4}
              value={newArticle.content}
              onChange={handleInputChange}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#1a237e',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1a237e',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: '#f8f9fa', borderTop: '1px solid #e0e0e0' }}>
          <Button 
            onClick={handleCloseDialog}
            sx={{ 
              color: '#666',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.05)',
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            sx={{
              bgcolor: '#1a237e',
              '&:hover': {
                bgcolor: '#0d47a1',
              },
              textTransform: 'none',
              px: 3,
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
