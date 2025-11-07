// ERC20 Token ABI (minimal for transfer)
export const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    type: 'function'
  }
] as const;

// Token configuration on Base mainnet
export interface Token {
  address: `0x${string}`;
  symbol: string;
  name: string;
  decimals: number;
  amount: string; // Amount to send in token units
  color: string; // Wheel segment color
}

// 🎃 Your Custom Halloween Tokens on Base Chain
export const TOKENS: Token[] = [
  {
    address: '0x673b10757baa011249d6d9076d994615d87820bd',
    symbol: 'SHAIKH',
    name: 'Shaikh Token',
    decimals: 18, // Standard ERC20 decimals
    amount: '1000', // 1000 SHAIKH tokens
    color: '#ff6b35' // Halloween orange
  },
  {
    address: '0xe734AF373f32E51F87209a3ba30F2125C315Ab07',
    symbol: 'JESSE41',
    name: 'Jesse41 Token',
    decimals: 18,
    amount: '6968', // 6968 JESSE41 tokens
    color: '#7209b7' // Purple
  },
  {
    address: '0x1111111111166b7FE7bd91427724B487980aFc69',
    symbol: 'ZORA',
    name: 'Zora Token',
    decimals: 18,
    amount: '0.0001', // 0.0001 ZORA tokens
    color: '#f72585' // Pink
  },
  {
    address: '0x3c10e3a3d0b22705b345b0647b72e7df370299bc',
    symbol: 'SMILE',
    name: 'Smile Token',
    decimals: 18,
    amount: '6969', // 6969 SMILE tokens
    color: '#00f5d4' // Cyan
  }
];