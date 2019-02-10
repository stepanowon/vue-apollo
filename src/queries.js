import gql from 'graphql-tag'

const SEARCH_CONTACTS = gql`
    query searchContactQuery($name: String!) {
        searchContact(name:$name) {
            _id name tel address photo
        }   
    }
`;
const INSERT_CONTACT = gql`
    mutation insertContactMutation($name: String!, $tel:String!, $address:String!) {
        insertContact(name:$name, tel:$tel, address:$address) {
            status message _id
        }
    }
`;

const DELETE_CONTACT = gql`
    mutation deleteContactMutation($_id: String!) {
        deleteContact(_id:$_id) {
            status message _id
        }
    }
`

export { SEARCH_CONTACTS, INSERT_CONTACT, DELETE_CONTACT }
