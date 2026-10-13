import { AlertCircle, CheckCircle, Send } from 'lucide-react'
import hero from '../assets/hero.png';
import { useState } from 'react';
import emailjs from "@emailjs/browser";
import { GrFormDown } from 'react-icons/gr';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({
        type: null, // 'success' or 'error'
        message: '',
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setSubmitStatus({ type: null, message: '' });
        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                throw new Error(
                    "EmailJS configuration is missing. Please check your environment variables."
                );
            }

            await emailjs.send(serviceId, templateId, {
                name: formData.name,
                email: formData.email,
                message: formData.message,
            }, publicKey);

            setSubmitStatus({
                type: 'success',
                message: "Message sent successfully! I'll get back to you soon.",
            });
            setFormData({ name: '', email: '', message: '' });

        } catch (err) {
            console.error('EmailJS error', err);
            setSubmitStatus({
                type: 'error',
                message: err.text || "Failed to send message. Please try again later.",
            });
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <section id='contact' className='py-20 relative overflow-hidden'>
            <div className='container mx-auto px-6 max-w-6xl relative z-10'>
                <div className='text-center mb-6' data-aos='fade-up'>
                    <h2 className='text-3xl sm:text-4xl font-bold mb-3 dark:text-white text-gray-900'>
                        Get In <span className='text-red-500 dark:text-red-400'> Touch </span>
                    </h2>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col gap-5 dark:bg-zinc-900/30 bg-white/50 p-8 sm:p-10 rounded-3xl border dark:border-zinc-800 border-gray-100 backdrop-blur-sm w-full max-w-xl mx-auto lg:mx-0 order-2 lg:order-1' dat-aos='fade-right'>
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            className='w-full px-5 py-4 rounded-xl border outline-hidden text-base transition-all dark:border-zinc-800 border-gray-200 dark:bg-zinc-900/60 bg-white dark:text-white text-gray-800 focus:border-red-500 dark:focus:border-red-400' />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            className='w-full px-5 py-4 rounded-xl border outline-hidden text-base transition-all dark:border-zinc-800 border-gray-200 dark:bg-zinc-900/60 bg-white dark:text-white text-gray-800 focus:border-red-500 dark:focus:border-red-400' required data-aos='fade-up' data-aos-delay='200' />
                        <textarea
                            rows={5}
                            placeholder="Message"
                            value={formData.message}
                            onChange={(e) =>
                                setFormData({ ...formData, message: e.target.value })
                            }
                            className='w-full px-5 py-4 rounded-xl border outline-hidden text-base transition-all dark:border-zinc-800 border-gray-200 dark:bg-zinc-900/60 bg-white dark:text-white text-gray-800 focus:border-red-500 dark:focus:border-red-400' required data-aos='fade-up' data-aos-delay='300' />
                        <button
                            type='submit'
                            disabled={isLoading}
                            className='inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-medium text-base bg-red-600 hover:bg-red-700 acrive:scale-98 transition-all cursor-pointer w-full sm:w-fit' data-aos='fade-up'
                            data-aos-delay='300'>

                            {isLoading ? (
                                <>Sending....</>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send Message
                                </>
                            )
                            }
                        </button>
                    
                        {submitStatus.type && (
                            <div
                            className={`flex items-center gap-3 p-4 rounded-xl ${
                                submitStatus.type === 'success'
                                ? "bg-gray-500/10 border border-green-500/20 text-green-400"
                            : "bg-red-500/10 border border-red-500/20 text-red-400"
                            }`}
                            >
                                {submitStatus.type === "success" ? (
                                    <CheckCircle size={18}/>
                                    ) : (
                                        <AlertCircle size={18}/>
                                    )}
                                    <p className='text-sm'>{submitStatus.message}</p>
                            </div>
                        )}
                    </form>


                    <div className='flex justify-center w-full relative order-1 lg:order-2' data-aos='fade-left'>
                        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                            <div className='w-75 h-90 rounded-full bg-red-400/65 dark:bg-red-500/40 blur-3xl scale-110' />
                        </div>
                        <img src={hero} alt="contact" className='w-96 h-110 object-cover rounded-3xl relative z-10' />
                    </div>

                </div>

            </div>



        </section >
    )
}
