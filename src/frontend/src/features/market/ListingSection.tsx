import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { appName, appDescription } from '@/appMetadata';

export function ListingSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>List on Caffeine App Market</CardTitle>
        <CardDescription>
          Share {appName} with the Caffeine community and potentially earn rewards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Step 1: Visit Caffeine.ai</h3>
              <p className="text-sm text-muted-foreground">
                Click the button below to open Caffeine.ai in a new tab
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Step 2: Navigate to App Market</h3>
              <p className="text-sm text-muted-foreground">
                Find the App Market section and click "Submit App" or "List Your App"
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Step 3: Provide App Details</h3>
              <p className="text-sm text-muted-foreground">
                Enter your app information:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground ml-4">
                <li>• <strong>Name:</strong> {appName}</li>
                <li>• <strong>Description:</strong> {appDescription}</li>
                <li>• <strong>URL:</strong> {typeof window !== 'undefined' ? window.location.origin : ''}</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Step 4: Submit for Review</h3>
              <p className="text-sm text-muted-foreground">
                Complete the submission form and wait for approval. Popular apps may receive airdrops!
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            size="lg"
            className="flex-1"
          >
            <a
              href="https://caffeine.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Go to Caffeine.ai
            </a>
          </Button>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Note:</strong> Listing your app in the Caffeine App Market
            can help you reach more users and potentially earn rewards based on popularity and usage.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
