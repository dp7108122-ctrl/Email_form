
import React, { useState, useCallback } from 'react';
import { ContactForm } from './components/ContactForm';
import { Toast } from './components/Toast';
import { generateConfirmationEmail } from './services/geminiService';
import type { FormData, ToastMessage } from './types';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const handleFormSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setToast({ message: 'Please fill out all fields.', type: 'error' });
      return;
    }
    // Simple email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setToast({ message: 'Please enter a valid email address.', type: 'error' });
        return;
    }

    setIsSubmitting(true);
    setToast(null);

    try {
      // Step 1: Use Gemini to generate the content for the user's confirmation email.
      // This simulates the "automatic reply" requirement.
      const confirmationEmailContent = await generateConfirmationEmail(formData);

      // --- SIMULATED BACKEND ACTIONS ---
      // In a real full-stack application, the following actions would be
      // handled by a dedicated backend server (e.g., Node.js + Express).

      // 2. Send email to admin (e.g., using Nodemailer)
      console.log('--- SIMULATING: Sending email to admin ---');
      console.log(`To: dp7108122@gmail.com`);
      console.log(`From: ${formData.email}`);
      console.log(`Name: ${formData.name}`);
      console.log(`Message: ${formData.message}`);
      console.log(`Timestamp: ${new Date().toISOString()}`);
      console.log('-----------------------------------------');


      // 3. Save form data to a database (e.g., MySQL, Firebase, MongoDB)
      console.log('--- SIMULATING: Saving to database ---');
      const dbRecord = {
        ...formData,
        submitted_at: new Date().toISOString(),
      };
      console.log('Table: contact_messages');
      console.log('Data:', dbRecord);
      console.log('------------------------------------');

      // 4. Send the generated confirmation email back to the user
      console.log('--- SIMULATING: Sending auto-reply to user ---');
      console.log(`To: ${formData.email}`);
      console.log('Subject: We have received your message!');
      console.log('Body:', confirmationEmailContent);
      console.log('--------------------------------------------');

      // --- END SIMULATION ---

      // Show success message to the user
      setToast({ message: 'Message Sent Successfully!', type: 'success' });

      // Clear the form
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      console.error("Error during form submission process:", error);
      setToast({ message: 'Failed to send message. Please try again later.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-slate-900 overflow-hidden">
        {/* Background decorative gradients */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

        <ContactForm 
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
        />

        <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default App;
