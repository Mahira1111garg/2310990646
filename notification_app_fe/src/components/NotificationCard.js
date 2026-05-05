import React, { useState } from 'react';
import { Card, CardContent, Typography, Chip, Box, Badge } from '@mui/material';

const colorMapping = {
  Placement: 'success',
  Result: 'primary',
  Event: 'warning'
};

function NotificationCard({ notification }) {
  const [isUnread, setIsUnread] = useState(true);

  return (
    <Card 
      onClick={() => setIsUnread(false)}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        background: isUnread ? 'rgba(144, 202, 249, 0.15)' : 'rgba(255, 255, 255, 0.05)', 
        borderLeft: isUnread ? '4px solid #90caf9' : '4px solid transparent',
        backdropFilter: 'blur(10px)', 
        transition: '0.3s', 
        '&:hover': { background: isUnread ? 'rgba(144, 202, 249, 0.2)' : 'rgba(255, 255, 255, 0.08)' } 
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Badge color="error" variant="dot" invisible={!isUnread}>
            <Chip label={notification.Type} color={colorMapping[notification.Type] || 'default'} size="small" />
          </Badge>
          <Typography variant="caption" color="text.secondary">
            {new Date(notification.Timestamp).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body1">
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;
