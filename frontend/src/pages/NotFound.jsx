import React from 'react';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import Button from '../components/common/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF8EF', padding: 24 }}>
      <Result
        status="404"
        title="404 - Page Not Found"
        subTitle="Oops! The educational page or lab module you are looking for does not exist."
        extra={
          <Button variant="primary" size="large" onClick={() => navigate(ROUTES.HOME)}>
            Back to Home 🏠
          </Button>
        }
      />
    </div>
  );
}
