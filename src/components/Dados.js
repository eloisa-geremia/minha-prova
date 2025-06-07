import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Box,
} from '@mui/material';

function Dados() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Detalhes do Post
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Título:
        </Typography>
        <Typography paragraph>{post.title}</Typography>

        <Typography variant="h6" color="primary" gutterBottom>
          Conteúdo:
        </Typography>
        <Typography paragraph>{post.body}</Typography>
      </Paper>
    </Container>
  );
}

export default Dados;