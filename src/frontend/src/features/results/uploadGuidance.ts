export interface UploadStep {
  title: string;
  description: string;
}

export const UPLOAD_GUIDANCE: UploadStep[] = [
  {
    title: 'Download your converted video',
    description: 'Click the Download button above to save the video file to your device.',
  },
  {
    title: 'Go to YouTube Studio',
    description: 'Visit studio.youtube.com and sign in to your YouTube account.',
  },
  {
    title: 'Click "Create" and select "Upload videos"',
    description: 'Find the upload button in the top right corner of YouTube Studio.',
  },
  {
    title: 'Select your downloaded file',
    description: 'Choose the video file you just downloaded from this converter.',
  },
  {
    title: 'Choose the right format',
    description:
      'For Shorts (9:16), select "YouTube Shorts". For Standard (16:9), upload as a regular video.',
  },
  {
    title: 'Add title, description, and tags',
    description: 'Fill in your video details to help viewers find your content.',
  },
  {
    title: 'Set visibility and publish',
    description: 'Choose Public, Unlisted, or Private, then click Publish when ready.',
  },
];
