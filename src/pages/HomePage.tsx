import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import ApiKeyInput from '../components/ApiKeyInput';
import PromptInput from '../components/PromptInput';
import TextOutput from '../components/TextOutput';
import ImageOutput from '../components/ImageOutput';
import { useGeminiApi } from '../hooks/useGeminiApi';

const HomePage = () => {
  const [apiKey, setApiKey] = useState('');
  const { loading, result, generateContent } = useGeminiApi();

  const handleExecute = (prompt: string, generateImage: boolean) => {
    generateContent(apiKey, prompt, generateImage);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manipulador da API Gemini
      </h1>
      
      <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
      
      <PromptInput onSubmit={handleExecute} loading={loading} />
      
      {result.error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600 flex items-start"
        >
          <AlertCircle className="mr-2 flex-shrink-0 mt-0.5" size={18} />
          <span>{result.error}</span>
        </motion.div>
      )}
      
      <TextOutput text={result.text} loading={loading} />
      
      <ImageOutput images={result.images} loading={loading} />
    </motion.div>
  );
};

export default HomePage;