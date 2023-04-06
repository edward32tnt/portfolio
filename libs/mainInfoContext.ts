import { createContext } from "react";

export const mainInfoContext = createContext({
  mainInfo: {
    id: '',
    fullName: '',
    currentTitle: '',
    linkedin: '',
    imageFromImageKits: [{
      urls: [],
    }],
  }
})