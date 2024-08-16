import * as React from 'react';

// Define a type for the file input that we expect
type FileInput = Blob | MediaSource;

// Utility function to generate preview URLs
const generatePreviewUrls = (files: FileInput[]): string[] => {
  return files.map((file: FileInput) => URL.createObjectURL(file));
};

// Utility function to revoke URLs when no longer needed
const revokePreviewUrls = (urls: string[]): void => {
  urls.forEach(url => URL.revokeObjectURL(url));
};

// Custom hook for handling profile picture previews
export const useProfilePicturePreview = (profilePicture: FileInput[] | string | null) => {
  const [previewsUrl, setPreviewsUrl] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (Array.isArray(profilePicture)) {
      // Generate preview URLs and set them in state
      const urls = generatePreviewUrls(profilePicture);
      setPreviewsUrl(urls);

      // Cleanup function to revoke object URLs when component unmounts or profilePicture changes
      return () => {
        revokePreviewUrls(urls);
      };
    } else {
      // Cleanup if profilePicture is not an array
      revokePreviewUrls(previewsUrl);
      setPreviewsUrl([]);
    }
  }, [profilePicture]);

  // Determine the source of the profile picture
  const src = Array.isArray(profilePicture) && previewsUrl.length > 0
    ? previewsUrl[0]
    : (typeof profilePicture === 'string' ? profilePicture : '');

  return src;
};
