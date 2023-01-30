/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🏁',
    'X': '💣',
    'I': '🏆',
    'PLAYER': '🏇',
    'BOMB_COLLISION': '🔥',
    'GAME_OVER': '👎',
    'WIN': '🏆',
    'HEART':'❤️',
    'N':'🌵',
    'T':'🌳',
    'P':'🌴',
    'C':'🏇',
    'META':'🏁',
    'COPA':'🏆',
    'V':'🚧'
  };
  
  const maps = [];
  maps.push(`
    NNNN----IN
    NNV--VNNNN
    NNV---VNNN
    NNNNV-VNNN
    NNNV--VNNN
    NNNV-VNNNN
    NV---VNNNN
    NV-VNNNNNN
    ---NNNNNNN
    OVNNNNNNNN
  `);
  maps.push(`
    O--VNNNNNN
    V--VNNNNNN
    NV----VNNN
    V--VV-VNNN
    N-VNV--VNN
    N-VNNV-VNN
    NV--NN--VN
    NV--VNV-VN
    NNNV---INN
    NNNNVVVNNN
    `);
  maps.push(`
    I-----NNNN
    NNNNN-NNNN
    NN----NNNN
    NN-NNNNNNN
    NN-----NNN
    NNNNNN-NNN
    NN-----NNN
    NN-NNNNNNN
    NN-----ONN
    NNNNNNNNNN
  `);