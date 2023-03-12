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

export const getSkill = gql`
query MainInfos {
  mainInfo(where: {id: "clf0p0xk31tca0a1213fm7544"}) {
    skills {
      id
      category
      integerDatas(orderBy: value_DESC) {
        id
        title
        value
      }
    }
  }
}

`

export const getWorkExperience = gql`
query MainInfos {
  mainInfo(where: {id: "clf0p0xk31tca0a1213fm7544"}) {
    workExperiences(orderBy: endTime_DESC) {
      id
      companyName
      jobTitle
      present
      startTime
      endTime
      description
      location
      companyLogo {
        url
      }
      tags {
        id
        title
      }
    }
  }
}


`

export const getEducation = gql`
query MainInfos {
  mainInfo(where: {id: "clf0p0xk31tca0a1213fm7544"}) {
    educations(orderBy: endTime_DESC) {
      id
      major
      present
      schoolName
      startTime
      endTime
    }
  }
}

`