export interface Album {
    id: string;
    name: string;
    artistNames: string[];
    releaseDate: string;
    trackCount: number;
    coverImageUrl: string;
  }
  
  export interface Track {
    id: string;
    name: string;
    artistName: string[];
    albumCoverUrl: string;
    previewUrl: string;
    playbackSeconds: number; // Change length to playbackSeconds
  }
  