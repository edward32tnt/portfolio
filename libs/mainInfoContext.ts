import { createContext } from "react";

export const mainInfoContext = createContext({
  mainInfo: {
    id: '',
    fullName: '',
    currentTitle: '',
    mainBackground: [
      {
        id: '',
        imageUrl: {
          url: '',
        },
      }
    ],
  }
})