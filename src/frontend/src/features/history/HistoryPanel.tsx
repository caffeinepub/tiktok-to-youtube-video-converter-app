import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useHistory } from './useHistory';
import { getPresetById } from '../converter/presets';
import { Trash2, ExternalLink, Clock } from 'lucide-react';
import { format } from 'date-fns';

export function HistoryPanel() {
  const { history, isLoading, deleteLocal } = useHistory();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">Loading history...</p>
        </CardContent>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-2">
            <Clock className="w-12 h-12 mx-auto text-muted-foreground/50" />
            <p className="text-muted-foreground">No conversion history yet</p>
            <p className="text-sm text-muted-foreground">
              Your converted videos will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion History</CardTitle>
        <CardDescription>Your recent TikTok to YouTube conversions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>TikTok URL</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Filename</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((entry) => {
                const preset = getPresetById(entry.preset);
                return (
                  <TableRow key={entry.id}>
                    <TableCell className="max-w-[300px]">
                      <a
                        href={entry.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 truncate"
                      >
                        <span className="truncate">{entry.tiktokUrl}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{preset?.name || entry.preset}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(entry.timestamp), 'MMM d, yyyy HH:mm')}
                    </TableCell>
                    <TableCell className="text-sm font-mono text-muted-foreground truncate max-w-[200px]">
                      {entry.outputFilename}
                    </TableCell>
                    <TableCell>
                      {entry.id.startsWith('backend-') ? (
                        <span className="text-xs text-muted-foreground">Synced</span>
                      ) : (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete History Entry</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this conversion from your history?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteLocal(entry.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
