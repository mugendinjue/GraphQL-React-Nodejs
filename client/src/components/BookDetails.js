
import { useQuery } from '@apollo/client';
import { GET_BOOK_DETAILS } from '../queries/query';

function BookDetails({bookId}) {

    const { loading, error, data } = useQuery(GET_BOOK_DETAILS,{variables:{id:bookId}});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
      <div id='book-details'>
        <h2>
            {data.book.name}
        </h2>

        <p>
            {data.book.genre}
        </p>

        <p>
            {data.book.author.name}
        </p>

        <p>Other books from the author.</p>

        <ul id='other-books'>

            {data.book.author.books.map( book => {
                return <li key={book.id}>{book.name}</li>
            })}

        </ul>
  
      </div>
    );
  }
  
  export default BookDetails;
  