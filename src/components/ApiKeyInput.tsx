import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, Eye, EyeOff } from 'lucide-react';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ApiKeyInput = ({ apiKey, setApiKey }: ApiKeyInputProps) => {
  const navigate = useNavigate();
  const [showKey, setShowKey] = useState(false);
  
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
          Insira sua Chave de API
        </label>
        <button
          type="button"
          onClick={() => navigate('/sobre')}
          className="ml-2 text-gray-400 hover:text-blue-600 focus:outline-none"
          aria-label="Ajuda sobre como obter a chave de API"
        >
          <HelpCircle size={16} />
        </button>
      </div>
      <div className="relative">
        <input
          id="apiKey"
          type={showKey ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Cole sua API Key aqui"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowKey(!showKey)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};

export default ApiKeyInput;