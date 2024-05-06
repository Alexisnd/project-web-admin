import React from 'react';
import ToastProvider from './toastProvider';

export const withToastProvider = (WrappedComponent: React.ComponentType) => {
  const WithToastProvider: React.FC = () => {
    return (
      <ToastProvider>
        <WrappedComponent/>
      </ToastProvider>
    );
  };
  return WithToastProvider;
};
