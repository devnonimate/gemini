import { useState } from 'react';
import { Send, Image, Type } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (prompt: string, generateImage: boolean) => void;
  loading: boolean;
}

const PromptInput = ({ onSubmit, loading }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  const [generateImage, setGenerateImage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !loading) {
      onSubmit(prompt.trim(), generateImage);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
          Digite seu prompt
        </label>
        <button
          type="button"
          onClick={() => setGenerateImage(!generateImage)}
          className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
            generateImage
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {generateImage ? (
            <>
              <Image size={16} /> Gerar Imagem
            </>
          ) : (
            <>
              <Type size={16} /> Gerar Texto
            </>
          )}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          id="prompt"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={generateImage ? "Ex: Um gato jogando xadrez" : "Ex: Explique inteligência artificial em 3 parágrafos"}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!prompt.trim() || loading}
          className={`flex items-center px-4 py-2 rounded-r-md focus:outline-none ${
            !prompt.trim() || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? 'Executando...' : 'Executar'}
          <Send size={16} className="ml-2" />
        </button>
      </form>
    </div>
  );
};

export default PromptInput;