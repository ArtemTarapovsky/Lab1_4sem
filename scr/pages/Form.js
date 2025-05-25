import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service: '',
    login: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (id) {
      const loadPassword = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/passwords/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Ошибка загрузки:", error);
        }
      };
      loadPassword();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/passwords/${id}`, formData);
      } else {
        await axios.post("http://localhost:5000/passwords", formData);
      }
      navigate('/');
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {id ? 'Редактирование пароля' : 'Добавление нового пароля'}
      </h1>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Сервис:</label>
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Логин:</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Пароль:</label>
          <div style={styles.passwordInputContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.passwordInput}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.showPasswordButton}
            >
              {showPassword ? 'Скрыть' : 'Показать'}
            </button>
          </div>
        </div>
        
        <div style={styles.buttonGroup}>
          <button 
            type="submit"
            style={styles.saveButton}
          >
            Сохранить
          </button>
          
          <Link 
            to="/" 
            style={styles.cancelButton}
          >
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333'
  },
  form: {
    backgroundColor: '#f9f9f9',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  },
  passwordInputContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  passwordInput: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRight: 'none',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    fontSize: '16px'
  },
  showPasswordButton: {
    padding: '10px 15px',
    backgroundColor: '#eee',
    border: '1px solid #ddd',
    borderLeft: 'none',
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '15px'
  },
  saveButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  cancelButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#f44336',
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    borderRadius: '4px',
    fontSize: '16px',
    transition: 'background-color 0.3s'
  }
};

export default Form;
