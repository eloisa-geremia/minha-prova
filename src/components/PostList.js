import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  function handleClick(id) {
    // Abre nova aba com rota /dados/:id
    window.open(`/dados/${id}`, '_blank');
  }

  return (
    <List>
      {posts.map((post) => (
        <ListItem key={post.id} disablePadding>
          <ListItemButton onClick={() => handleClick(post.id)}>
            <ListItemText primary={post.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}