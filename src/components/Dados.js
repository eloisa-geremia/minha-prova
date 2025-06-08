import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const Dados = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const postData = await resPost.json();
        setPost(postData);

        const resUser = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
        const userData = await resUser.json();
        setAuthor(userData);

        const resComments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        const commentsData = await resComments.json();
        setComments(commentsData);

        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchDados();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, mb: 5 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          {post.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.body}
        </Typography>
        {author && (
          <Typography variant="subtitle2" color="text.secondary">
            Autor: <strong>{author.name}</strong> ({author.email})
          </Typography>
        )}
      </Paper>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          Comentários
        </Typography>
        <List>
          {comments.map((comment, index) => (
            <Box key={comment.id}>
              <ListItem alignItems="flex-start" disableGutters sx={{ mb: 2 }}>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {comment.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {comment.body}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        — {comment.email}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < comments.length - 1 && <Divider sx={{ mb: 2 }} />}
            </Box>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Dados;