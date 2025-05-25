import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/passwords");
      setPasswords(response.data);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };

  const deletePassword = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/passwords/${id}`);
      loadData();
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>Менеджер паролей</h1>
      <Link 
        to="/add" 
        style={{
          display: 'inline-block',
          marginBottom: '20px',
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}
      >
        Добавить новый пароль
      </Link>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {passwords.map(password => (
          <li 
            key={password.id} 
            style={{
              padding: '15px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <Link 
                to={`/detail/${password.id}`}
                style={{ marginRight: '15px', textDecoration: 'none' }}
              >
                {password.service} - {password.login}
              </Link>
            </div>
            <div>
              <button 
                onClick={() => deletePassword(password.id)}
                style={{
                  marginRight: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Удалить
              </button>
              <Link 
                to={`/edit/${password.id}`}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px'
                }}
              >
                Редактировать
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;