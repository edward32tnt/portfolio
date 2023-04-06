import { createContext } from "react";

export const mainInfoContext = createContext({
  mainInfo: {
    id: '',
    fullName: '',
    currentTitle: '',
    linkedin: '',
    avatarFromImageKit: {
      urls: []
    },
    imageFromImageKits: [{
      urls: [],
    }],
  }
})