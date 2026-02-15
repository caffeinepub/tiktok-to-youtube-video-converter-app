export interface ConversionPreset {
  id: string;
  name: string;
  description: string;
  aspectRatio: string;
  resolution: string;
  width: number;
  height: number;
  icon: string;
}

export const CONVERSION_PRESETS: ConversionPreset[] = [
  {
    id: 'shorts',
    name: 'YouTube Shorts',
    description: 'Vertical format perfect for YouTube Shorts',
    aspectRatio: '9:16',
    resolution: '1080x1920',
    width: 1080,
    height: 1920,
    icon: '📱',
  },
  {
    id: 'standard',
    name: 'YouTube Standard',
    description: 'Horizontal format for regular YouTube videos',
    aspectRatio: '16:9',
    resolution: '1920x1080',
    width: 1920,
    height: 1080,
    icon: '🖥️',
  },
];

export function getPresetById(id: string): ConversionPreset | undefined {
  return CONVERSION_PRESETS.find((preset) => preset.id === id);
}
