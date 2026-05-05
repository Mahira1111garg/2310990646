import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import NotificationCard from '../components/NotificationCard';

function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5001/notifications/top`);
        setNotifications(res.data.top);
        setError('');
      } catch (err) {
        setError('Failed to load priority notifications.');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Priority Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Displaying Top 10 most urgent notifications based on Priority Weight and Recency.
        </Typography>
      </Box>

      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {notifications.length === 0 ? (
            <Typography variant="body1" color="text.secondary">No urgent notifications found.</Typography>
          ) : (
            notifications.map((notif, idx) => (
              <NotificationCard key={notif.ID || idx} notification={notif} />
            ))
          )}
        </>
      )}
    </Box>
  );
}

export default PriorityNotifications;
