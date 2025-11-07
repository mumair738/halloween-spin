import { NextRequest, NextResponse } from 'next/server';
import { createWalletClient, http, parseUnits, type Address } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import { TOKENS, ERC20_ABI } from '@/lib/contracts';

// Server-side API route to send tokens using private key
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { tokenAddress, recipientAddress } = await req.json();

    // Validate inputs
    if (!tokenAddress || !recipientAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find the token configuration
    const token = TOKENS.find((t) => t.address.toLowerCase() === tokenAddress.toLowerCase());
    if (!token) {
      return NextResponse.json(
        { error: 'Invalid token address' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Token sending functionality disabled' },
      { status: 503 }
    );

  } catch (error: unknown) {
    console.error('Token transfer error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Transfer failed',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}