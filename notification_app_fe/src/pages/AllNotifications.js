import React, { useState, useEffect } from 'react';
import { Box, Typography, Pagination, Tabs, Tab, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import NotificationCard from '../components/NotificationCard';

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState('All');
  
  const limit = 5;

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5001/notifications`, {
          params: { page, limit, type: filterType }
        });
        setNotifications(res.data.data);
        setTotalPages(Math.ceil(res.data.total / limit));
        setError('');
      } catch (err) {
        setError('Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [page, filterType]);

  const handleTabChange = (event, newValue) => {
    setFilterType(newValue);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        All Notifications
      </Typography>
      
      <Tabs value={filterType} onChange={handleTabChange} sx={{ mb: 3 }} textColor="inherit" indicatorColor="primary">
        <Tab label="All" value="All" />
        <Tab label="Placement" value="Placement" />
        <Tab label="Result" value="Result" />
        <Tab label="Event" value="Event" />
      </Tabs>

      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {notifications.length === 0 ? (
            <Typography variant="body1" color="text.secondary">No notifications found.</Typography>
          ) : (
            notifications.map((notif, idx) => (
              <NotificationCard key={notif.ID || idx} notification={notif} />
            ))
          )}
          
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default AllNotifications;
