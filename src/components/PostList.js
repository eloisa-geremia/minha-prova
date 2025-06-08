import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Lista de Posts
      </Typography>

      {posts.map((post) => (
        <Paper
          key={post.id}
          elevation={3}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            cursor: 'pointer',
            transition: '0.3s',
            '&:hover': {
              transform: 'scale(1.01)',
              boxShadow: 6,
              backgroundColor: '#f9f9f9',
            },
          }}
          onClick={() => navigate(`/dados/${post.id}`)}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.body.slice(0, 100)}...
          </Typography>
        </Paper>
      ))}
    </Container>
  );
};

export default PostList;