import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent } from '@mui/material';

export default function Dados() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1">{post.body}</Typography>
      </CardContent>
    </Card>
  );
}