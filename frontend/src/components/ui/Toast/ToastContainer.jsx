import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  CloseOutlined,
} from '@ant-design/icons';
import { subscribeToast } from '../../../utils/premiumToast';
import s from './Toast.module.scss';

const DEFAULT_TITLES = {
  success: 'Success',
  error: 'Action Failed',
  warning: 'Warning',
  info: 'Notice',
};

function ToastItem({ toast, onDismiss }) {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const startTimeRef = useRef(Date.now());
  const remainingTimeRef = useRef(toast.duration || 4000);
  const animationFrameRef = useRef(null);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 260);
  };

  useEffect(() => {
    if (toast.duration === 0) return; // Persistent

    let timer = setInterval(() => {
      if (!isPaused) {
        remainingTimeRef.current -= 50;
        const pct = Math.max(0, (remainingTimeRef.current / (toast.duration || 4000)) * 100);
        setProgress(pct);

        if (remainingTimeRef.current <= 0) {
          clearInterval(timer);
          handleClose();
        }
      }
    }, 50);

    return () => clearInterval(timer);
  }, [isPaused, toast.duration]);

  const renderIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircleFilled />;
      case 'error':
        return <CloseCircleFilled />;
      case 'warning':
        return <ExclamationCircleFilled />;
      case 'info':
      default:
        return <InfoCircleFilled />;
    }
  };

  const title = toast.title || DEFAULT_TITLES[toast.type] || 'Notice';

  return (
    <div
      className={`${s.toastCard} ${s[toast.type] || s.info} ${isExiting ? s.isExiting : ''} ${toast.shake ? s.shake : ''}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="alert"
    >
      <div className={s.iconBox}>{renderIcon()}</div>

      <div className={s.contentWrapper}>
        <div className={s.title}>{title}</div>
        <div className={s.message}>{toast.message}</div>
      </div>

      <button
        type="button"
        className={s.closeBtn}
        onClick={handleClose}
        aria-label="Close Toast"
      >
        <CloseOutlined />
      </button>

      {toast.duration > 0 && (
        <div className={s.progressBarTrack}>
          <div className={s.progressBar} style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToast((newToast) => {
      setToasts((prev) => {
        // Deduplication: if exact same message exists within active toasts, shake existing one
        const existingIndex = prev.findIndex(
          (t) => t.message === newToast.message && t.type === newToast.type
        );

        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            shake: true,
            keyId: Date.now(), // forces re-render
          };
          return updated;
        }

        // Limit to max 3 toasts
        const nextList = [...prev, newToast];
        if (nextList.length > 4) {
          return nextList.slice(nextList.length - 4);
        }
        return nextList;
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleDismiss = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className={s.toastContainer} aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={handleDismiss} />
      ))}
    </div>
  );
}
