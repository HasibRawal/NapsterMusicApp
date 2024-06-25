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
    artistName: string;
    previewURL: string;
    albumCoverUrl: string;
    duration: number;
  }
  