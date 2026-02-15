import { useState } from 'react';
import { BrandHeader } from './components/BrandHeader';
import { EmptyStateHero } from './features/converter/EmptyStateHero';
import { ConverterForm } from './features/converter/ConverterForm';
import { PresetPicker } from './features/converter/PresetPicker';
import { DownloadPanel } from './features/converter/DownloadPanel';
import { ResultsScreen } from './features/results/ResultsScreen';
import { HistoryPanel } from './features/history/HistoryPanel';
import { ShareAndListPanel } from './features/market/ShareAndListPanel';
import { Card } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { SiFacebook, SiX, SiLinkedin } from 'react-icons/si';
import { buildFacebookShareUrl, buildXShareUrl, buildLinkedInShareUrl } from './utils/shareLinks';
import { appName } from './appMetadata';

type AppStep = 'idle' | 'preset-selection' | 'converting' | 'results';

export interface ConversionState {
  tiktokUrl: string;
  preset: string;
  videoBlob?: Blob;
  videoUrl?: string;
  outputFilename?: string;
}

function App() {
  const [step, setStep] = useState<AppStep>('idle');
  const [conversionState, setConversionState] = useState<ConversionState>({
    tiktokUrl: '',
    preset: 'shorts',
  });
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

  const handleUrlSubmit = (url: string) => {
    setConversionState({ ...conversionState, tiktokUrl: url });
    setStep('preset-selection');
  };

  const handlePresetSelect = (preset: string) => {
    setConversionState({ ...conversionState, preset });
  };

  const handleConversionComplete = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    setConversionState({
      ...conversionState,
      videoBlob: blob,
      videoUrl: url,
      outputFilename: filename,
    });
    setStep('results');
    setHistoryRefreshKey((prev) => prev + 1);
  };

  const handleStartOver = () => {
    if (conversionState.videoUrl) {
      URL.revokeObjectURL(conversionState.videoUrl);
    }
    setConversionState({ tiktokUrl: '', preset: 'shorts' });
    setStep('idle');
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out ${appName}!`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <BrandHeader />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {step === 'idle' && (
          <div className="space-y-8">
            <EmptyStateHero />
            <Card className="p-6 md:p-8">
              <ConverterForm onSubmit={handleUrlSubmit} />
            </Card>
          </div>
        )}

        {step === 'preset-selection' && (
          <div className="space-y-6">
            <Card className="p-6 md:p-8">
              <PresetPicker
                selectedPreset={conversionState.preset}
                onPresetChange={handlePresetSelect}
              />
            </Card>
            <DownloadPanel
              tiktokUrl={conversionState.tiktokUrl}
              preset={conversionState.preset}
              onConversionComplete={handleConversionComplete}
              onCancel={handleStartOver}
            />
          </div>
        )}

        {step === 'results' && conversionState.videoUrl && (
          <ResultsScreen
            videoUrl={conversionState.videoUrl}
            outputFilename={conversionState.outputFilename || 'converted-video.mp4'}
            preset={conversionState.preset}
            onStartOver={handleStartOver}
          />
        )}

        {step === 'idle' && (
          <div className="mt-12">
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2">
                <TabsTrigger value="history">Conversion History</TabsTrigger>
                <TabsTrigger value="share">Share & List</TabsTrigger>
              </TabsList>
              <TabsContent value="history" className="mt-6">
                <HistoryPanel key={historyRefreshKey} />
              </TabsContent>
              <TabsContent value="share" className="mt-6">
                <ShareAndListPanel />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {appName}. Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'tt2yt-converter'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex items-center gap-4">
              <a
                href={buildFacebookShareUrl(currentUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Share on Facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href={buildXShareUrl(currentUrl, shareText)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Share on X (Twitter)"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a
                href={buildLinkedInShareUrl(currentUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Share on LinkedIn"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
