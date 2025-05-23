import { motion } from 'framer-motion';

interface TextOutputProps {
  text: string;
  loading: boolean;
}

const TextOutput = ({ text, loading }: TextOutputProps) => {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">Geração de Texto</h2>
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`border rounded-lg p-4 min-h-[160px] max-h-[320px] overflow-auto bg-white ${
          loading ? 'animate-pulse' : ''
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400">Gerando texto...</div>
          </div>
        ) : text ? (
          <div className="whitespace-pre-line">{text}</div>
        ) : (
          <div className="text-gray-400 h-full flex items-center justify-center">
            Os resultados do texto aparecerão aqui
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default TextOutput;