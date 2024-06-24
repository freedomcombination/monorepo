const turkishToEnglishMap: { [key: string]: string } = {
  ç: 'c',
  Ç: 'C',
  ğ: 'g',
  Ğ: 'G',
  ı: 'i',
  I: 'I',
  İ: 'I',
  ö: 'o',
  Ö: 'O',
  ş: 's',
  Ş: 'S',
  ü: 'u',
  Ü: 'U',
}

export const convertTRCharsToEN = (input: string): string => {
  return input
    .split('')
    .map(char => turkishToEnglishMap[char] || char)
    .join('')
}
