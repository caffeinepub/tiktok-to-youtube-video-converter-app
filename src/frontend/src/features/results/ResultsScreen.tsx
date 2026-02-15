import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { getPresetById } from '../converter/presets';
import { UPLOAD_GUIDANCE } from './uploadGuidance';
import { Download, RotateCcw, CheckCircle2, Info } from 'lucide-react';

interface ResultsScreenProps {
  videoUrl: string;
  outputFilename: string;
  preset: string;
  onStartOver: () => void;
}

export function ResultsScreen({
  videoUrl,
  outputFilename,
  preset,
  onStartOver,
}: ResultsScreenProps) {
  const presetData = getPresetById(preset);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = outputFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-primary/10 border-primary">
        <CheckCircle2 className="h-5 w-5 text-primary" />
        <AlertTitle className="text-primary">Conversion Complete!</AlertTitle>
        <AlertDescription>
          Your video is ready for download. Follow the steps below to upload it to YouTube.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Your converted video frame</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted rounded-lg overflow-hidden">
                <img
                  src={videoUrl}
                  alt="Converted video preview"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleDownload} className="flex-1" size="lg">
                  <Download className="mr-2 w-5 h-5" />
                  Download
                </Button>
                <Button onClick={onStartOver} variant="outline" size="lg">
                  <RotateCcw className="mr-2 w-5 h-5" />
                  Start Over
                </Button>
              </div>
              {presetData && (
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <span className="font-medium">Format:</span> {presetData.name}
                  </p>
                  <p>
                    <span className="font-medium">Resolution:</span> {presetData.resolution}
                  </p>
                  <p>
                    <span className="font-medium">Filename:</span> {outputFilename}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload to YouTube</CardTitle>
            <CardDescription>Follow these steps to upload your video</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                This app does not automatically upload to YouTube. You'll need to upload manually.
              </AlertDescription>
            </Alert>
            <ol className="space-y-4">
              {UPLOAD_GUIDANCE.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm font-medium text-foreground">{step.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="text-center">
        <Button onClick={onStartOver} variant="outline" size="lg">
          <RotateCcw className="mr-2 w-5 h-5" />
          Convert Another Video
        </Button>
      </div>
    </div>
  );
}
