import { motion } from 'framer-motion';

interface ImageOutputProps {
  images: string[];
  loading: boolean;
}

const ImageOutput = ({ images, loading }: ImageOutputProps) => {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">Geração de Imagens</h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className="h-60 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : images.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={src}
                alt={`Imagem gerada ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="border rounded-lg p-4 h-60 flex items-center justify-center bg-white">
          <div className="text-gray-400">
            As imagens geradas aparecerão aqui
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageOutput;