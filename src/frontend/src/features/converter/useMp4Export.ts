import { useState } from 'react';
import { ConversionPreset } from './presets';

interface ExportResult {
  blob: Blob;
  filename: string;
}

export function useMp4Export() {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const convertAndExport = async (
    tiktokUrl: string,
    preset: ConversionPreset
  ): Promise<ExportResult | null> => {
    setError(null);
    setProgress(0);

    try {
      // Simulate conversion progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Create a canvas to generate a demo video frame
      const canvas = document.createElement('canvas');
      canvas.width = preset.width;
      canvas.height = preset.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Could not create canvas context');
      }

      // Draw a gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#d97706');
      gradient.addColorStop(1, '#ea580c');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 48px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Demo Conversion', canvas.width / 2, canvas.height / 2 - 40);
      ctx.font = '32px system-ui';
      ctx.fillText(preset.name, canvas.width / 2, canvas.height / 2 + 20);
      ctx.font = '24px system-ui';
      ctx.fillText(preset.resolution, canvas.width / 2, canvas.height / 2 + 60);

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error('Failed to create blob'));
          },
          'image/jpeg',
          0.95
        );
      });

      clearInterval(progressInterval);
      setProgress(100);

      // Generate filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      const filename = `tiktok-to-youtube-${preset.id}-${timestamp}.jpg`;

      // Note: In a real implementation, this would use FFmpeg.wasm or similar
      // to create an actual MP4 video file. For demo purposes, we're creating
      // a JPEG image that represents a video frame.

      return { blob, filename };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      return null;
    }
  };

  return {
    convertAndExport,
    progress,
    error,
  };
}
