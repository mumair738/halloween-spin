'use client'
import { WalletProvider } from '@/components/WalletProvider';
import { SpinWheel } from '@/components/SpinWheel';
import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { useAddMiniApp } from "@/hooks/useAddMiniApp";
import { useQuickAuth } from "@/hooks/useQuickAuth";
import { useIsInFarcaster } from "@/hooks/useIsInFarcaster";

export default function Home() {
    const { addMiniApp } = useAddMiniApp();
    const isInFarcaster = useIsInFarcaster()
    useQuickAuth(isInFarcaster)
    useEffect(() => {
      const tryAddMiniApp = async () => {
        try {
          await addMiniApp()
        } catch (error) {
          console.error('Failed to add mini app:', error)
        }

      }

    

      tryAddMiniApp()
    }, [addMiniApp])
    useEffect(() => {
      const initializeFarcaster = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 100))

          if (document.readyState !== 'complete') {
            await new Promise<void>(resolve => {
              if (document.readyState === 'complete') {
                resolve()
              } else {
                window.addEventListener('load', () => resolve(), { once: true })
              }

            })
          }

    

          await sdk.actions.ready()
          console.log('Farcaster SDK initialized successfully - app fully loaded')
        } catch (error) {
          console.error('Failed to initialize Farcaster SDK:', error)

          setTimeout(async () => {
            try {
              await sdk.actions.ready()
              console.log('Farcaster SDK initialized on retry')
            } catch (retryError) {
              console.error('Farcaster SDK retry failed:', retryError)
            }

          }, 1000)
        }

      }

    

      initializeFarcaster()
    }, [])
  return (
    <WalletProvider>
      <main className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-orange-950 py-12 px-4">
        {/* Halloween decorations */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
          <div className="absolute top-10 left-10 text-6xl animate-bounce">🎃</div>
          <div className="absolute top-20 right-20 text-5xl animate-pulse">👻</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-bounce">🦇</div>
          <div className="absolute bottom-10 right-10 text-6xl animate-pulse">🕷️</div>
          <div className="absolute top-1/3 left-1/4 text-4xl animate-spin-slow">🕸️</div>
          <div className="absolute top-2/3 right-1/3 text-4xl animate-pulse">💀</div>
        </div>

        {/* Title */}
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-600 drop-shadow-2xl mb-4">
            HELLOWEEN SPIN-TO-WIN
          </h1>
          <p className="text-2xl text-orange-300 font-semibold">
            🎰 Powered by Base Chain ⛓️
          </p>
        </div>

        {/* Spin Wheel Component */}
        <SpinWheel />

        {/* Footer */}
        <div className="text-center mt-12 text-purple-300">
          <p className="text-lg">🎃 Happy Halloween! Built with Reown AppKit 🎃</p>
        </div>
      </main>
    </WalletProvider>
  );
}