import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";
import { ResponseLogger } from "@/components/ResponseLogger";
import { cookies } from "next/headers";
import { ReadyNotifier } from "@/components/ReadyNotifier";
import FarcasterWrapper from "@/components/FarcasterWrapper";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestId = (await cookies()).get("x-request-id")?.value;

  return (
        <html lang="en">
          <head>
            {requestId && <meta name="x-request-id" content={requestId} />}
          </head>
          <body
            className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
          >
            {/* Do not remove this component, we use it to notify the parent that the mini-app is ready */}
            <ReadyNotifier />

      <FarcasterWrapper>
        {children}
      </FarcasterWrapper>

            <ResponseLogger />
          </body>
        </html>
      );
}

export const metadata: Metadata = {
        title: "Response Genie",
        description: "Generate convenient, user-friendly app replies and suggestions quickly with Response Genie. Enhance your interaction effortlessly.",
        other: { "fc:frame": JSON.stringify({"version":"next","imageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/thumbnail_9ebd3df4-11bf-4c51-8a89-92a6abfd8dcf-ldUSnXwxn3gxQjAX2APaPNlQEOpNTI","button":{"title":"Open with Ohara","action":{"type":"launch_frame","name":"Response Genie","url":"https://television-obtain-017.app.ohara.ai","splashImageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/farcaster/splash_images/splash_image1.svg","splashBackgroundColor":"#ffffff"}}}
        ) }
    };