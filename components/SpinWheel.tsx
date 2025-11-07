'use client';

import { useState, useRef, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useAppKitAccount } from '@reown/appkit/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TOKENS } from '@/lib/contracts';
import type { Token } from '@/lib/contracts';

export function SpinWheel() {
  const { address, isConnected } = useAccount();
  const { isConnected: isAppKitConnected } = useAppKitAccount();

  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>('');
  const [error, setError] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load Halloween sound effect
  useEffect(() => {
    audioRef.current = new Audio('/halloween-sound.mp3');
    audioRef.current.volume = 0.3;
  }, []);

  const handleSpin = (): void => {
    if (isSpinning || !isConnected || !address) {
      setError('Please connect your wallet first!');
      return;
    }

    setError('');
    setTxHash('');

    // Play Halloween sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }

    setIsSpinning(true);

    // Random selection (100% win rate - always picks a token)
    const randomIndex: number = Math.floor(Math.random() * TOKENS.length);
    const token: Token = TOKENS[randomIndex];
    setSelectedToken(token);

    // Calculate rotation (multiple full spins + landing position)
    const segmentAngle: number = 360 / TOKENS.length;
    const targetAngle: number = randomIndex * segmentAngle;
    const spins: number = 5; // 5 full rotations
    const finalRotation: number = 360 * spins + targetAngle;

    setRotation(rotation + finalRotation);

    // After animation, send token
    setTimeout(() => {
      setIsSpinning(false);
      sendToken(token, address);
    }, 4000);
  };

  const sendToken = async (token: Token, recipient: string): Promise<void> => {
    setIsSending(true);
    setError('');

    try {
      const response = await fetch('/api/send-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenAddress: token.address,
          recipientAddress: recipient,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Transfer failed');
      }

      setTxHash(data.txHash);
      setIsSending(false);
    } catch (err: unknown) {
      console.error('Transfer error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Transfer failed: ${errorMessage}`);
      setIsSending(false);
    }
  };

  const segmentAngle: number = 360 / TOKENS.length;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-orange-900 to-purple-900 border-4 border-orange-500">
      <CardHeader className="text-center">
        <CardTitle className="text-5xl font-bold text-orange-300 drop-shadow-lg">
          🎃 Helloween Spin-to-Win 🎃
        </CardTitle>
        <CardDescription className="text-xl text-purple-200">
          Spin the wheel and win tokens on Base! 100% win rate guaranteed! 👻
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Wallet Connection Status */}
        <div className="text-center p-4 bg-black/50 rounded-lg border-2 border-purple-500">
          {isConnected && address ? (
            <div className="space-y-2">
              <div className="text-green-400 font-semibold">✅ Wallet Connected</div>
              <div className="text-sm text-gray-300 font-mono">
                {address.slice(0, 6)}...{address.slice(-4)}
              </div>
              <div className="text-xs text-purple-300">
                🎯 Tokens will be sent to your connected wallet!
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-yellow-400 font-semibold">⚠️ Wallet Not Connected</div>
              <div className="text-sm text-gray-300">
                Click the button below to connect your wallet
              </div>
            </div>
          )}
        </div>

        {/* Reown AppKit Connect Button */}
        <div className="flex justify-center">
          <appkit-button />
        </div>

        {/* Wheel Container */}
        <div className="relative w-80 h-80 mx-auto">
          {/* Spin Wheel */}
          <div
            className="absolute inset-0 rounded-full border-8 border-orange-400 shadow-2xl overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
            }}
          >
            {TOKENS.map((token: Token, index: number) => {
              const startAngle = index * segmentAngle;
              const endAngle = (index + 1) * segmentAngle;

              return (
                <div
                  key={token.address + index}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    transformOrigin: 'center',
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((endAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((endAngle - 90) * Math.PI / 180)}%)`,
                    backgroundColor: token.color.replace('bg-', '').replace('-500', '')
                  }}
                >
                  <div
                    className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-white font-bold text-sm text-center"
                    style={{
                      transform: `rotate(${startAngle + segmentAngle / 2}deg)`,
                      transformOrigin: 'center'
                    }}
                  >
                    <span style={{ transform: 'rotate(90deg)' }}>
                      {token.symbol}
                      <br />
                      {token.amount}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-black border-4 border-orange-400 flex items-center justify-center text-4xl z-10">
            🦇
          </div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 z-20">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-16 border-l-transparent border-r-transparent border-t-red-600 drop-shadow-xl"></div>
          </div>
        </div>

        {/* Spin Button */}
        <Button
          onClick={handleSpin}
          disabled={isSpinning || !isConnected || isSending}
          className="w-full h-14 text-xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white shadow-lg disabled:opacity-50"
        >
          {isSpinning ? '🎃 SPINNING... 🎃' : isSending ? '⏳ Sending Token...' : isConnected ? '🎰 SPIN THE WHEEL 🎰' : '⚠️ CONNECT WALLET FIRST'}
        </Button>

        {/* Error Display */}
        {error && (
          <div className="text-center p-4 bg-red-900/50 rounded-lg border-2 border-red-500">
            <div className="text-xl text-red-300">❌ {error}</div>
          </div>
        )}

        {/* Result Display */}
        {selectedToken && !isSpinning && txHash && (
          <div className="text-center p-6 bg-black/50 rounded-lg border-2 border-green-500 animate-pulse">
            <div className="text-3xl mb-2">🎉 YOU WON! 🎉</div>
            <div className="text-2xl font-bold text-yellow-300 mb-3">
              {selectedToken.amount} {selectedToken.symbol}
            </div>
            <div className="text-green-400 font-semibold mb-2">
              ✅ Token sent to your wallet!
            </div>
            <a
              href={`https://basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline text-sm"
            >
              View transaction on BaseScan 🔗
            </a>
          </div>
        )}

        {/* Token List - Shows what you can win */}
        <div className="space-y-2 pt-4 border-t-2 border-orange-500">
          <h3 className="text-center text-xl font-bold text-orange-300">🎁 Prize Pool:</h3>
          <div className="grid grid-cols-2 gap-3">
            {TOKENS.map((token: Token) => (
              <div
                key={token.address + token.amount}
                className="p-3 rounded-lg text-center font-semibold text-white"
                style={{ backgroundColor: token.color.replace('bg-', '').replace('-500', '') }}
              >
                <div className="text-lg">{token.symbol}</div>
                <div className="text-sm">{token.amount} tokens</div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-sm text-purple-200 text-center space-y-2 pt-4 border-t-2 border-orange-500">
          <p>🎃 <strong>How to Play:</strong></p>
          <p>1. Connect your wallet using Reown AppKit</p>
          <p>2. Click SPIN and watch the wheel!</p>
          <p>3. Win tokens sent directly to YOUR wallet!</p>
          <p className="text-yellow-300">👻 <strong>Note:</strong> 100% win rate - Base chain only</p>
        </div>
      </CardContent>
    </Card>
  );
}