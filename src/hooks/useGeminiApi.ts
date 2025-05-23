import { useState } from 'react';
import { GoogleGenAI, Modality, HarmCategory, HarmBlockThreshold } from '@google/genai';

interface GeminiResult {
  text: string;
  images: string[];
  error: string | null;
}

export const useGeminiApi = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeminiResult>({
    text: '',
    images: [],
    error: null
  });

  const generateContent = async (apiKey: string, prompt: string, generateImage: boolean) => {
    if (!apiKey) {
      setResult({
        text: '',
        images: [],
        error: 'Por favor, insira uma chave de API válida'
      });
      return;
    }

    setLoading(true);
    setResult({
      text: '',
      images: [],
      error: null
    });

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      if (generateImage) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-preview-image-generation',
            contents: prompt,
            config: {
              responseModalities: [Modality.TEXT, Modality.IMAGE],
              safetySettings: [
                {
                  category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                  category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                  category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                  category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
              ],
              generationConfig: {
                temperature: 0.9,
                topK: 32,
                topP: 1,
                maxOutputTokens: 2048,
              },
            },
          });
          
          const images: string[] = [];
          const texts: string[] = [];
          
          for (const part of response.candidates[0].content.parts) {
            if (part.text) {
              texts.push(part.text);
            } else if (part.inlineData) {
              const { data, mimeType } = part.inlineData;
              if (data && mimeType) {
                images.push(`data:${mimeType};base64,${data}`);
              }
            }
          }
          
          setResult({ 
            text: texts.join('\n'), 
            images, 
            error: null 
          });
        } catch (error) {
          console.error('Error generating image:', error);
          setResult({
            text: '',
            images: [],
            error: 'Erro ao gerar imagens. A geração de imagens pode não estar disponível com sua chave de API atual.'
          });
        }
      } else {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
            config: {
              safetySettings: [
                {
                  category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                  category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                  category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                  category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
              ],
            },
          });
          
          const textResult = response.candidates[0].content.parts
            .filter(part => part.text)
            .map(part => part.text)
            .join('\n');
            
          setResult({ text: textResult, images: [], error: null });
        } catch (error) {
          console.error('Error generating text:', error);
          setResult({
            text: '',
            images: [],
            error: 'Erro ao gerar texto. Verifique sua chave de API e tente novamente.'
          });
        }
      }
    } catch (error) {
      console.error('Error with Gemini API:', error);
      setResult({
        text: '',
        images: [],
        error: 'Erro ao conectar com a API Gemini. Verifique sua chave de API e conexão de internet.'
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    result,
    generateContent
  };
};