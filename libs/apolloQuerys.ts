import { gql } from '@apollo/client'

export const getMainInfo = gql`
  query MainInfos {
    mainInfo(where: { id: "clf0p0xk31tca0a1213fm7544" }) {
      createdAt
      currentTitle
      fullName
      id
      linkedin
      resumeDownload {
        url
      }
      mainBackground {
        ... on Image {
          imageUrl {
            id
            url
            size
            width
            height
            fileName
          }
        }
      }
    }
  }
`

export const getPersonInfo = gql`
query MainInfos {
  personInfo(where: {id: "clf23gqra4uk80czjfsi5gukc"}) {
    textDatas {
      id
      title
      value {
        raw
      }
    }
  }
}

`