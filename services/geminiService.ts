import { GoogleGenAI, Type } from "@google/genai";
import { GEMINI_SYSTEM_PROMPT } from '../constants';
import { SentenceData, WordType } from '../types';

// Fix: Removed `as string` type assertion for API key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        words: {
            type: Type.ARRAY,
            description: "Een array van objecten, waarbij elk object een woord en het bijbehorende type woordsoort is.",
            items: {
                type: Type.OBJECT,
                properties: {
                    word: { 
                        type: Type.STRING,
                        description: "Het woord uit de zin."
                    },
                    type: {
                        type: Type.STRING,
                        description: "De woordsoort.",
                        enum: [
                            WordType.LIDWOORD,
                            WordType.BIJVOEGLIJK_NAAMWOORD,
                            WordType.ZELFSTANDIG_NAAMWOORD,
                            WordType.WERKWOORD,
                            WordType.VOORZETSEL,
                        ],
                    },
                },
                required: ['word', 'type'],
            },
        },
    },
    required: ['words'],
};


export const generateSentence = async (): Promise<SentenceData> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Genereer een nieuwe zin.",
            config: {
                systemInstruction: GEMINI_SYSTEM_PROMPT,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.9,
            },
        });

        const jsonText = response.text;
        const parsedData = JSON.parse(jsonText);

        // Validate the structure
        if (!parsedData.words || !Array.isArray(parsedData.words)) {
            throw new Error("Invalid data structure received from API");
        }

        return parsedData as SentenceData;
    } catch (error) {
        console.error("Error generating sentence:", error);
        throw new Error("Kon geen zin genereren. Probeer het later opnieuw.");
    }
};