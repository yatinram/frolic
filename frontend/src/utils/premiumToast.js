import { message as antdMessage, notification as antdNotification } from 'antd';

let subscribers = [];
let toastCounter = 0;

export function subscribeToast(callback) {
  subscribers.push(callback);
  return () => {
    subscribers = subscribers.filter((cb) => cb !== callback);
  };
}

export function emitToast(toastData) {
  subscribers.forEach((cb) => cb(toastData));
}

function resolveTitle(type, message, customTitle) {
  if (customTitle && typeof customTitle === 'string' && customTitle.trim()) {
    return customTitle;
  }

  const msgLower = (message || '').toLowerCase();

  // Gujarati title mapping
  if (message && /[અ-હા-્]/.test(message)) {
    if (type === 'success') return 'સફળતા (Success)';
    if (type === 'error') return 'ભૂલ (Error)';
    if (type === 'warning') return 'ધ્યાન આપો (Notice)';
    return 'માહિતી (Info)';
  }

  if (type === 'error') {
    if (msgLower.includes('password') || msgLower.includes('credential') || msgLower.includes('email/username') || msgLower.includes('login')) {
      return 'Authentication Failed';
    }
    if (msgLower.includes('network') || msgLower.includes('connect') || msgLower.includes('timeout')) {
      return 'Connection Error';
    }
    if (msgLower.includes('required') || msgLower.includes('field') || msgLower.includes('valid')) {
      return 'Validation Alert';
    }
    if (msgLower.includes('delete') || msgLower.includes('remove')) {
      return 'Delete Failed';
    }
    if (msgLower.includes('update') || msgLower.includes('save')) {
      return 'Update Failed';
    }
    return 'Action Failed';
  }

  if (type === 'success') {
    if (msgLower.includes('welcome') || msgLower.includes('logged in')) {
      return 'Welcome Back!';
    }
    if (msgLower.includes('delete') || msgLower.includes('remove')) {
      return 'Deleted Successfully';
    }
    if (msgLower.includes('update') || msgLower.includes('saved') || msgLower.includes('status')) {
      return 'Saved Successfully';
    }
    if (msgLower.includes('create') || msgLower.includes('added') || msgLower.includes('new product') || msgLower.includes('new center')) {
      return 'Created Successfully';
    }
    if (msgLower.includes('enquiry') || msgLower.includes('application') || msgLower.includes('received') || msgLower.includes('sent')) {
      return 'Request Submitted!';
    }
    if (msgLower.includes('order')) {
      return 'Order Placed!';
    }
    return 'Success!';
  }

  if (type === 'warning') {
    if (msgLower.includes('required') || msgLower.includes('complete') || msgLower.includes('check')) {
      return 'Incomplete Details';
    }
    return 'Attention Required';
  }

  return 'Information';
}

function triggerToast(type, content, titleOrDescription, duration = 4000) {
  let messageText = '';
  let customTitle = null;

  if (typeof content === 'object' && content !== null) {
    messageText = content.content || content.description || content.message || '';
    customTitle = content.title || (content.description ? content.message : null);
    if (content.duration) duration = content.duration * 1000;
  } else {
    messageText = String(content || '');
    if (typeof titleOrDescription === 'string') {
      customTitle = titleOrDescription;
    }
  }

  const resolvedTitle = resolveTitle(type, messageText, customTitle);

  const toastObj = {
    id: `frolic-toast-${Date.now()}-${++toastCounter}`,
    type,
    title: resolvedTitle,
    message: messageText,
    duration: duration || 4000,
    timestamp: Date.now(),
  };

  emitToast(toastObj);
}

export const toast = {
  success: (msg, title, duration) => triggerToast('success', msg, title, duration),
  error: (msg, title, duration) => triggerToast('error', msg, title, duration),
  warning: (msg, title, duration) => triggerToast('warning', msg, title, duration),
  info: (msg, title, duration) => triggerToast('info', msg, title, duration),
};

function handleNotificationConfig(type, config) {
  if (typeof config === 'object' && config !== null) {
    const title = config.message || null;
    const body = config.description || config.message || '';
    const duration = config.duration !== undefined ? config.duration * 1000 : 4500;
    triggerToast(type, body, title, duration);
  } else {
    triggerToast(type, config);
  }
}

/**
 * Universal Global Override for Ant Design:
 * Intercepts BOTH antd `message.*` AND `notification.*` calls across the entire project.
 * Automatically converts every popup/alert into Frolic's Ultra-Premium Glassmorphic Toast!
 */
let isOverridden = false;
export function initPremiumToastOverride() {
  if (isOverridden) return;
  isOverridden = true;

  // 1. Override message.*
  if (antdMessage) {
    antdMessage.success = (content, duration) => {
      triggerToast('success', content, null, (duration || 3.5) * 1000);
      return () => {};
    };

    antdMessage.error = (content, duration) => {
      triggerToast('error', content, null, (duration || 4) * 1000);
      return () => {};
    };

    antdMessage.warning = (content, duration) => {
      triggerToast('warning', content, null, (duration || 4) * 1000);
      return () => {};
    };

    antdMessage.info = (content, duration) => {
      triggerToast('info', content, null, (duration || 3.5) * 1000);
      return () => {};
    };

    antdMessage.loading = (content, duration) => {
      triggerToast('info', content, 'Processing...', (duration || 2.5) * 1000);
      return () => {};
    };

    antdMessage.open = (config) => {
      const type = config?.type || 'info';
      const content = config?.content || config?.message || '';
      triggerToast(type, content);
      return () => {};
    };
  }

  // 2. Override notification.*
  if (antdNotification) {
    antdNotification.success = (config) => handleNotificationConfig('success', config);
    antdNotification.error = (config) => handleNotificationConfig('error', config);
    antdNotification.warning = (config) => handleNotificationConfig('warning', config);
    antdNotification.info = (config) => handleNotificationConfig('info', config);
    antdNotification.open = (config) => handleNotificationConfig('info', config);
  }
}

// Auto-run patch immediately on import
initPremiumToastOverride();

export default toast;
