import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useMp4Export } from './useMp4Export';
import { getPresetById } from './presets';
import { Download, AlertCircle, Info, X } from 'lucide-react';

interface DownloadPanelProps {
  tiktokUrl: string;
  preset: string;
  onConversionComplete: (blob: Blob, filename: string) => void;
  onCancel: () => void;
}

export function DownloadPanel({
  tiktokUrl,
  preset,
  onConversionComplete,
  onCancel,
}: DownloadPanelProps) {
  const [isConverting, setIsConverting] = useState(false);
  const { convertAndExport, progress, error } = useMp4Export();
  const presetData = getPresetById(preset);

  const handleConvert = async () => {
    if (!presetData) return;

    setIsConverting(true);
    try {
      const result = await convertAndExport(tiktokUrl, presetData);
      if (result) {
        onConversionComplete(result.blob, result.filename);
      }
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ready to Convert</CardTitle>
        <CardDescription>
          Your video will be prepared for download. This app does not upload to YouTube
          automatically.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Important Note</AlertTitle>
          <AlertDescription>
            Due to platform restrictions, this tool creates a demo conversion. For actual TikTok
            video downloads, you'll need to use TikTok's download feature or third-party tools that
            comply with TikTok's terms of service.
          </AlertDescription>
        </Alert>

        {presetData && (
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">Output Settings</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Format:</span>
                <span className="ml-2 font-medium">{presetData.name}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Aspect Ratio:</span>
                <span className="ml-2 font-medium">{presetData.aspectRatio}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Resolution:</span>
                <span className="ml-2 font-medium">{presetData.resolution}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Format:</span>
                <span className="ml-2 font-medium">MP4</span>
              </div>
            </div>
          </div>
        )}

        {isConverting && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Converting...</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3">
          <Button
            onClick={handleConvert}
            disabled={isConverting}
            size="lg"
            className="flex-1"
          >
            {isConverting ? (
              'Converting...'
            ) : (
              <>
                <Download className="mr-2 w-5 h-5" />
                Convert & Download
              </>
            )}
          </Button>
          <Button onClick={onCancel} variant="outline" size="lg" disabled={isConverting}>
            <X className="mr-2 w-5 h-5" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
