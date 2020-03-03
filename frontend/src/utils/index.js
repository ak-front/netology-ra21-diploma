import { store } from 'react-notifications-component';

const NOTIFICATION_DEFAULTS = {
  insert: 'top',
  container: 'top-right',
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut'],
  dismiss: {
    duration: 3000
  },
  slidingEnter: {
    cubicBezier: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    delay: 0,
    duration: 300
  },
  slidingExit: {
    cubicBezier: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    delay: 0,
    duration: 600
  }
};

export const formatPrice = (price = 0) => {
  return price.toLocaleString('ru-RU');
};

export const notifySuccess = message => {
  store.addNotification({
    ...NOTIFICATION_DEFAULTS,
    message,
    type: 'success'
  });
};

export const notifyError = message => {
  store.addNotification({
    ...NOTIFICATION_DEFAULTS,
    message,
    type: 'danger'
  });
};