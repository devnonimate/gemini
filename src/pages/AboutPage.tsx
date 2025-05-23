import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar para Início
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Sobre a API Gemini
      </h1>

      <div className="prose max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Como obter sua Chave de API Gemini</h2>
          
          <div className="mb-8">
            <p className="mb-4 text-lg">1. Acesse <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://aistudio.google.com/apikey</a></p>
            <div className="border rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://i.imgur.com/R1YTB5P.jpg" 
                alt="Acesso ao API Studio" 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div className="mb-8">
            <p className="mb-4 text-lg">2. Clique em Criar Chave API e copie a chave gerada.</p>
            <div className="border rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://i.imgur.com/Z1jdnAc.jpg" 
                alt="Criar Chave API" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Sobre o Gemini</h2>
          <p className="mb-4">
            O Gemini é o modelo de IA mais avançado do Google, capaz de combinar diferentes tipos de informações, 
            como texto, código, imagens e vídeo. Ele foi projetado para ser multimodal desde o início.
          </p>
          <p className="mb-4">
            Com a API Gemini, você pode integrar essas capacidades em seus próprios aplicativos, permitindo:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Geração de texto de alta qualidade</li>
            <li>Criação de imagens a partir de descrições textuais</li>
            <li>Análise e resumo de conteúdos complexos</li>
            <li>Assistência em programação e escrita de código</li>
          </ul>
          <p>
            Para mais informações, visite a <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">documentação oficial do Google AI</a>.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default AboutPage;