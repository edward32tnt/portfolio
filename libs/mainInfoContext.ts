import { createContext } from "react";

export const mainInfoContext = createContext({
  mainInfo: {
    id: '',
    fullName: '',
    currentTitle: '',
    linkedin: '',
    resumeDownload: {
      url: '',
    },
    images: [
      {
        id: '',
        imageUrl: {
          url: '',
        },
      }
    ],
  }
})