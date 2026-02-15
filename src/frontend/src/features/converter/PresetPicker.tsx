import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CONVERSION_PRESETS } from './presets';

interface PresetPickerProps {
  selectedPreset: string;
  onPresetChange: (preset: string) => void;
}

export function PresetPicker({ selectedPreset, onPresetChange }: PresetPickerProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Format</h2>
        <p className="text-muted-foreground">
          Select the output format that matches your YouTube upload needs
        </p>
      </div>

      <RadioGroup value={selectedPreset} onValueChange={onPresetChange}>
        <div className="grid md:grid-cols-2 gap-4">
          {CONVERSION_PRESETS.map((preset) => (
            <Card
              key={preset.id}
              className={`cursor-pointer transition-all hover:border-primary ${
                selectedPreset === preset.id ? 'border-primary ring-2 ring-primary/20' : ''
              }`}
              onClick={() => onPresetChange(preset.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{preset.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{preset.name}</CardTitle>
                      <CardDescription>{preset.description}</CardDescription>
                    </div>
                  </div>
                  <RadioGroupItem value={preset.id} id={preset.id} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Badge variant="secondary">{preset.aspectRatio}</Badge>
                  <Badge variant="secondary">{preset.resolution}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
