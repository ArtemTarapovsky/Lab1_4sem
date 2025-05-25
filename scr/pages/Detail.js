import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams();
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    const loadPassword = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/passwords/${id}`);
        setPassword(response.data);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      }
    };
    loadPassword();
  }, [id]);

  if (!password) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>Детали пароля</h1>
      <p><strong>Сервис:</strong> {password.service}</p>
      <p><strong>Логин:</strong> {password.login}</p>
      <p><strong>Пароль:</strong> {password.password}</p>
      <Link to="/">Назад к списку</Link>
    </div>
  );
};

export default Detail;