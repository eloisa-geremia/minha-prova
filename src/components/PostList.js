import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Container, Typography, Paper } from '@mui/material';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleClick = (id) => {
    window.open(`/dados/${id}`, '_blank');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Posts
      </Typography>
      <Paper elevation={3}>
        <List>
          {posts.map((post) => (
            <ListItem
              button
              key={post.id}
              onClick={() => handleClick(post.id)}
              divider
            >
              <ListItemText primary={post.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default PostList;