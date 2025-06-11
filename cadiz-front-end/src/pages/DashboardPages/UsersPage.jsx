import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Stack,
  Modal,
  Button,
  Switch,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, createUser, updateUser } from '../../services/UserService'; // Adjust the path

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 700,
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  zIndex: 1500, // Ensure it's above AppBar/Drawer
};

const UsersPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    address: '',
    type: 'viewer',
    isActive: true,
  });
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const userType = localStorage.getItem('userType') || '';

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const { data } = await fetchUsers();
        // Ensure each user has a unique id field
        const usersWithIds = (data.users || []).map(user => ({
          ...user,
          id: user._id // DataGrid requires a unique id field
        }));
        setUsers(usersWithIds);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUsers();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setNewUser({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      contactNumber: '',
      email: '',
      username: '',
      password: '',
      address: '',
      type: 'viewer',
      isActive: true,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditUserId(null);
  };

  const handleEdit = (user) => {
    setNewUser({ ...user, password: '' });
    setEditUserId(user.id);
    setIsEditing(true);
    setOpen(true);
  };

  const handleSaveUser = async () => {
    try {
      setLoading(true);
      if (isEditing) {
        const updatedUser = { ...newUser };
        if (!updatedUser.password) {
          delete updatedUser.password;
        }
        await updateUser(editUserId, updatedUser);
      } else {
        await createUser(newUser);
      }
      const { data } = await fetchUsers();
      const usersWithIds = (data.users || []).map(user => ({
        ...user,
        id: user._id
      }));
      setUsers(usersWithIds);
      handleClose();
    } catch (error) {
      console.error('Error saving user:', error);
      setError('Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await updateUser(id, { isActive: !isActive });
      const { data } = await fetchUsers();
      const usersWithIds = (data.users || []).map(user => ({
        ...user,
        id: user._id
      }));
      setUsers(usersWithIds);
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setOpenDialog(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  // If user is not admin, redirect to dashboard
  if (userType !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box sx={{ 
      backgroundColor: 'white', 
      minHeight: '100vh',
      p: 3,
      pt: 8, // Increased top padding to account for the top bar
    }}>
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: '#f8f9fa' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: '#1a237e' }}>
              Users
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Manage system users and their permissions
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleOpen}
            startIcon={<AddCircleIcon />}
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
            Add User
          </Button>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <TableContainer 
        component={Paper}
        sx={{ 
          width: '100%',
          borderRadius: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
              <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>Age</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>Contact</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>Address</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#1a237e' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell sx={{ color: '#424242' }}>{user.firstName}</TableCell>
                  <TableCell sx={{ color: '#424242' }}>{user.lastName}</TableCell>
                  <TableCell sx={{ color: '#424242' }}>{user.age}</TableCell>
                  <TableCell sx={{ color: '#424242' }}>{user.gender}</TableCell>
                  <TableCell sx={{ color: '#424242' }}>{user.email}</TableCell>
                  <TableCell sx={{ color: '#424242' }}>{user.type}</TableCell>
                  <TableCell sx={{ color: '#424242' }}>{user.contactNumber}</TableCell>
                  <TableCell sx={{ color: '#424242' }}>{user.username}</TableCell>
                  <TableCell sx={{ color: '#424242' }}>{user.address}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit User">
                      <IconButton
                        onClick={() => handleEdit(user)}
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
          count={users.length}
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

      <Modal open={open} onClose={handleClose} keepMounted>
        <Box sx={modalStyle}>
          <Typography variant="h5" sx={{ mb: 3, color: '#1a237e', fontWeight: 600 }}>
            {isEditing ? 'Edit User' : 'Add User'}
          </Typography>
          
          <Grid container spacing={2}>
            {/* Personal Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.secondary' }}>
                Personal Information
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <TextField
                  label="First Name"
                  fullWidth
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                  required
                />
                <TextField
                  label="Last Name"
                  fullWidth
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                  required
                />
              </Stack>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <TextField
                  label="Age"
                  fullWidth
                  type="number"
                  value={newUser.age}
                  onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                />
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={newUser.gender}
                    onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.secondary' }}>
                Contact Information
              </Typography>
              <Stack spacing={2} sx={{ mb: 2 }}>
                <TextField
                  label="Mobile"
                  fullWidth
                  value={newUser.contactNumber}
                  onChange={(e) => setNewUser({ ...newUser, contactNumber: e.target.value })}
                />
                <TextField
                  label="Email"
                  fullWidth
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
                <TextField
                  label="Address"
                  fullWidth
                  multiline
                  rows={2}
                  value={newUser.address}
                  onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                />
              </Stack>
            </Grid>

            {/* Account Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.secondary' }}>
                Account Information
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Username"
                  fullWidth
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  required
                />
                {(!isEditing || newUser.password) && (
                  <TextField
                    label={isEditing ? "New Password (leave blank to keep current)" : "Password"}
                    type="password"
                    fullWidth
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required={!isEditing}
                  />
                )}
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={newUser.type}
                    onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
                    required
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="editor">Editor</MenuItem>
                    <MenuItem value="viewer">Viewer</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ 
                minWidth: 100,
                color: '#666',
                borderColor: '#666',
                '&:hover': {
                  borderColor: '#1a237e',
                  color: '#1a237e',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveUser}
              sx={{ 
                minWidth: 100,
                bgcolor: '#1a237e',
                '&:hover': {
                  bgcolor: '#0d47a1',
                },
              }}
            >
              {isEditing ? 'Save Changes' : 'Add User'}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default UsersPage;