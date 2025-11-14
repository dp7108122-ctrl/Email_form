
import React from 'react';
import type { FormData } from '../types';
import { UserIcon } from './icons/UserIcon';
import { EmailIcon } from './icons/EmailIcon';
import { MessageIcon } from './icons/MessageIcon';
import { SendIcon } from './icons/SendIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface ContactFormProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ formData, setFormData, onSubmit, isSubmitting }) => {
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="z-10 w-full max-w-md mx-auto">
            <form 
                onSubmit={onSubmit} 
                className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-8 space-y-6 border border-white/20"
                noValidate
            >
                <h2 className="text-3xl font-bold text-center text-white mb-6">Contact Us</h2>
                
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className="w-full pl-10 pr-4 py-3 bg-gray-900/50 text-white border-2 border-transparent rounded-lg focus:border-purple-500 focus:outline-none focus:ring-0 transition duration-300"
                        required
                    />
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <EmailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        className="w-full pl-10 pr-4 py-3 bg-gray-900/50 text-white border-2 border-transparent rounded-lg focus:border-purple-500 focus:outline-none focus:ring-0 transition duration-300"
                        required
                    />
                </div>

                <div className="relative">
                     <div className="absolute top-4 left-0 pl-3 flex items-center pointer-events-none">
                        <MessageIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your Message"
                        rows={5}
                        className="w-full pl-10 pr-4 py-3 bg-gray-900/50 text-white border-2 border-transparent rounded-lg focus:border-purple-500 focus:outline-none focus:ring-0 transition duration-300 resize-none"
                        required
                    ></textarea>
                </div>

                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500"
                >
                    {isSubmitting ? (
                        <>
                            <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                            Sending...
                        </>
                    ) : (
                        <>
                            Send Message
                            <SendIcon className="ml-2 h-5 w-5" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};
