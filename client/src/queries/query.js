import { gql } from '@apollo/client';

const GET_AUTHORS = gql`
    {
        authors {
            id
            name
        }
    }
`;

const GET_BOOKS = gql`
    {
        books {
            id
            name
            genre
        }
    }
`;

const ADD_BOOK = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            genre
            id
        }
    }
`;

const GET_BOOK_DETAILS = gql`
    query ($id: ID!){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    id
                    name
                    genre
                }
            }
        }
    }
`;

export {GET_AUTHORS, GET_BOOKS, ADD_BOOK, GET_BOOK_DETAILS}