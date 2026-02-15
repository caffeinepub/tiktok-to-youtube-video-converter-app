import { Video } from 'lucide-react';

export function BrandHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/tt2yt-logo.dim_512x512.png"
              alt="TT2YT Logo"
              className="w-12 h-12 rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                TikTok → YouTube
                <Video className="w-6 h-6 text-primary" />
              </h1>
              <p className="text-sm text-muted-foreground">
                Convert TikTok videos for YouTube in seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
