import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
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
        // Busca o post
        const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const postData = await resPost.json();
        setPost(postData);

        // Busca o autor
        const resUser = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
        const userData = await resUser.json();
        setAuthor(userData);

        // Busca os comentários
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
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>{post.title}</Typography>
        <Typography variant="body1" gutterBottom>{post.body}</Typography>
        {author && (
          <Typography variant="subtitle2" color="text.secondary">
            Autor: {author.name} ({author.email})
          </Typography>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Comentários:</Typography>
        <List>
          {comments.map(comment => (
            <React.Fragment key={comment.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={comment.name}
                  secondary={
                    <>
                      <Typography variant="body2" color="text.primary">{comment.body}</Typography>
                      <Typography variant="caption" color="text.secondary">— {comment.email}</Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Dados;