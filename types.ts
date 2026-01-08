
export enum WordType {
  LIDWOORD = 'Lidwoord',
  BIJVOEGLIJK_NAAMWOORD = 'Bijvoeglijk naamwoord',
  ZELFSTANDIG_NAAMWOORD = 'Zelfstandig naamwoord',
  WERKWOORD = 'Werkwoord',
  VOORZETSEL = 'Voorzetsel',
}

export type WordData = {
  word: string;
  type: WordType;
};

export type SentenceData = {
  words: WordData[];
};

export type UserSelections = {
  [index: number]: WordType | undefined;
};
