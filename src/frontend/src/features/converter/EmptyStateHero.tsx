import { ArrowRight } from 'lucide-react';

export function EmptyStateHero() {
  return (
    <div className="text-center space-y-6 py-8">
      <div className="max-w-2xl mx-auto">
        <img
          src="/assets/generated/tt2yt-hero.dim_1600x900.png"
          alt="Convert TikTok to YouTube"
          className="w-full h-auto rounded-2xl shadow-lg"
        />
      </div>
      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Ready to Convert Your TikTok Videos?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Paste your TikTok URL below and choose your YouTube format. We'll prepare your video for
          download in seconds.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>No upload required</span>
          <ArrowRight className="w-4 h-4" />
          <span>Download locally</span>
          <ArrowRight className="w-4 h-4" />
          <span>Upload to YouTube manually</span>
        </div>
      </div>
    </div>
  );
}
