
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_BOOKS } from '../queries/query';
import BookDetails from './BookDetails';

function BookList() {

    const [bookDetailsState, setBookDetailsState] = useState({
        id: '',
    });


    const { loading, error, data } = useQuery(GET_BOOKS);

    const handleClick = (id) => {
        setBookDetailsState({id})
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const listItems = data.books.map(
        (element) => {
            return (

                <li key={element.id} onClick={() => handleClick(element.id)} >{element.name}</li>
            )
        }
    )

    return (
      <div>
  
        <ul id="book-list">

            {listItems}

        </ul>

        {bookDetailsState.id ? (
            <BookDetails bookId = {bookDetailsState.id}/>
        ) : (
            <p>Click on a book to view more details</p>
        )}
  
      </div>
    );
  }
  
  export default BookList;
  