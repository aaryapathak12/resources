import data from '../data/data.json';

export function paraSelector(a, b, c, d) {
  const min = 0;
  const max = 5;
  const rid = Math.floor(Math.random() * (max - min + 1) + min);

  if (a === 1) {
    return data.paragraphs.simple[rid]?.text;
  } else if (b === 1) {
    return data.paragraphs.with_numbers[rid]?.text;
  } else if (c === 1) {
    return data.paragraphs.with_symbols_and_punctuation[rid]?.text;
  } else if (d === 1) {
    return data.paragraphs.combination[rid]?.text;
  }

  return "Default paragraph if none selected.";
}
