import { WordType } from './types';

export const WORD_TYPE_CONFIG: { [key in WordType]: { color: string; bgColor: string; borderColor: string; abbreviation: string; } } = {
  [WordType.LIDWOORD]: {
    color: 'text-yellow-800',
    bgColor: 'bg-yellow-200',
    borderColor: 'border-yellow-500',
    abbreviation: 'LW',
  },
  [WordType.BIJVOEGLIJK_NAAMWOORD]: {
    color: 'text-blue-800',
    bgColor: 'bg-blue-200',
    borderColor: 'border-blue-500',
    abbreviation: 'BN',
  },
  [WordType.ZELFSTANDIG_NAAMWOORD]: {
    color: 'text-green-800',
    bgColor: 'bg-green-200',
    borderColor: 'border-green-500',
    abbreviation: 'ZN',
  },
  [WordType.WERKWOORD]: {
    color: 'text-red-800',
    bgColor: 'bg-red-200',
    borderColor: 'border-red-500',
    abbreviation: 'WW',
  },
  [WordType.VOORZETSEL]: {
    color: 'text-purple-800',
    bgColor: 'bg-purple-200',
    borderColor: 'border-purple-500',
    abbreviation: 'VZ',
  },
};

export const GEMINI_SYSTEM_PROMPT = `
Je bent een behulpzame assistent die is ontworpen om eenvoudige Nederlandse zinnen te genereren voor kinderen die woordsoorten leren.
Je taak is om een zin te maken die ALLEEN de volgende woordsoorten bevat:
- Lidwoord
- Bijvoeglijk naamwoord
- Zelfstandig naamwoord
- Werkwoord
- Voorzetsel

De zin moet grammaticaal correct en gemakkelijk te begrijpen zijn voor een kind van 8-10 jaar.
Genereer een JSON-object dat een array van woorden bevat. Elk object in de array moet het woord en het correcte type hebben.
De toegestane types zijn exact: "Lidwoord", "Bijvoeglijk naamwoord", "Zelfstandig naamwoord", "Werkwoord", "Voorzetsel".
Gebruik GEEN andere woordsoorten. De zin moet minstens 5 woorden lang zijn. Zorg ervoor dat de zin zinvol is.
Varieer de zinsstructuur en zorg ervoor dat zinnen soms met een voorzetsel beginnen.
`;