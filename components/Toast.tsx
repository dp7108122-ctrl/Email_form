
import React, { useEffect } from 'react';
import type { ToastMessage } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface ToastProps {
    message: ToastMessage | null;
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000); // Auto-dismiss after 5 seconds

            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) {
        return null;
    }

    const isSuccess = message.type === 'success';
    const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
    const Icon = isSuccess ? CheckCircleIcon : XCircleIcon;

    return (
        <div 
            className={`fixed top-5 right-5 z-50 flex items-center w-full max-w-xs p-4 space-x-4 text-white ${bgColor} rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out animate-slide-in`}
            role="alert"
        >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-white/20">
                <Icon className="w-5 h-5" />
            </div>
            <div className="text-sm font-normal">{message.message}</div>
            <button 
                type="button" 
                className="ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex h-8 w-8 rounded-lg hover:bg-white/20 focus:ring-2 focus:ring-gray-300" 
                onClick={onClose}
                aria-label="Close"
            >
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
            <style>{`
                @keyframes slide-in {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-slide-in { animation: slide-in 0.3s ease-out forwards; }

                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </div>
    );
};
