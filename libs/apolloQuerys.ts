import { gql } from '@apollo/client'


const getMainInfo = `
    linkedin
    id
    fullName
    currentTitle
    avatarFromImageKit {
      urls
    }
    imageFromImageKits {
      urls
    }
`

export const getPersonInfo = gql`
query MyQuery {
  mainInfo(where: {id: "clf0p0xk31tca0a1213fm7544"}) {
    ${getMainInfo}
    personInfo {
      textDatas {
        id
        title
        value {
          raw
        }
      }
    }
  }
}


`

export const getSkill = gql`
query MainInfos {
  mainInfo(where: {id: "clf0p0xk31tca0a1213fm7544"}) {
    ${getMainInfo}
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
    ${getMainInfo}
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
      imageFromImageKit {
        urls
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
    ${getMainInfo}
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

export const getGuessbook = gql`
query GuestBooks ($skip: Int = 0) {
  mainInfo(where: {id: "clf0p0xk31tca0a1213fm7544"}) {
    ${getMainInfo}
  }
  guestBooks(orderBy: publishedAt_DESC, first: 10, skip: $skip) {
    nickname
    id
    publishedAt
    content
  }
}

`

export const createGuessbook = gql`
mutation CreateGuestBook($nickname: String!, $content: String!, $hash: String!){
  createGuestBook(
    data: {content: $content, nickname: $nickname, hash: $hash}
  ) {
    id
  }
  publishGuestBook(where: {hash: $hash}, to: PUBLISHED) {
    id
  }
}

`

export const getProject = gql`
query MainInfos {
  mainInfo(where: {id: "clf0p0xk31tca0a1213fm7544"}) {
    ${getMainInfo}
    projects {
      description
      endTime
      id
      role
      projectName
      startTime
      present
      imageFromImageKit {
        urls
      }
      images {
        id
        imageUrl {
          url
          width
          height
        }
      }
    }
  }
}


`

export const getBlog = gql`
query MainInfos {
  mainInfo(where: {id: "clf0p0xk31tca0a1213fm7544"}) {
    ${getMainInfo}
  }
  blogs {
    id
    title
    body
    category
    createdAt
    likeCount
    tags {
      title
    }
  }
}
`