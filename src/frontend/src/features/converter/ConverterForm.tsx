import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { validateTikTokUrl } from './validators';
import { ArrowRight, AlertCircle } from 'lucide-react';

interface ConverterFormProps {
  onSubmit: (url: string) => void;
}

export function ConverterForm({ onSubmit }: ConverterFormProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateTikTokUrl(url);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid URL');
      return;
    }
    setError('');
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="tiktok-url" className="text-base font-semibold">
          TikTok Video URL
        </Label>
        <div className="flex gap-3">
          <Input
            id="tiktok-url"
            type="text"
            placeholder="https://www.tiktok.com/@username/video/..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            className="flex-1 h-12 text-base"
          />
          <Button type="submit" size="lg" className="px-8">
            Continue
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Paste the full URL of the TikTok video you want to convert
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
