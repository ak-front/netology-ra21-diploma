import { store } from 'react-notifications-component';

export const formatPrice = (price = 0) => {
  return price.toLocaleString('ru-RU');
};

export const notifySuccess = message => {
  store.addNotification({
    message,
    type: 'success',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 3000
    },
    slidingEnter: {
      duration: 300
    },
    slidingExit: {
      duration: 300
    }
  });
};

export const notifyError = message => {
  store.addNotification({
    message,
    type: 'danger',
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
  });
};