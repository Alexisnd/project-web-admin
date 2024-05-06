'use client';

import React, { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";

type ToastProviderProps = {
	children: React.ReactNode;
	showInfoToast?: (message: string, options?: object) => void;
	showErrorToast?: (message: string, options?: object) => void;
	showSuccessToast?: (message: string, options?: object) => void;
	showWarnToast?: (message: string, options?: object) => void;
};

type ToastContextType = {
	toast: React.MutableRefObject<Toast | null>;
};

const ToastContext = createContext<ToastContextType>({
	toast: { current: null }
});

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({
	children
}: ToastProviderProps) => {
	const toast = useRef<Toast | null>(null);
	return (
		<ToastContext.Provider value={{ toast }}>
			<Toast ref={toast} className="custom_toast" />
			{children}
		</ToastContext.Provider>
	);
};

export default ToastProvider;
