import gql from 'graphql-tag'

export default {
    searchContact : gql`
        query {
            searchContact(name:"se") {
                _id name tel address photo
            }
        }
    `
}