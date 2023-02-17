
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_BOOK, GET_AUTHORS, GET_BOOKS } from '../queries/query';

function AddBook() {

    const [formState, setFormState] = useState({
        name: '',
        genre: '',
        authorId: ''
    });

    const { loading, error, data } = useQuery(GET_AUTHORS);

    const [mutateFunction, { loading:looking_book, error:add_book_error }] = useMutation(ADD_BOOK, {
        refetchQueries: [
            {query: GET_BOOKS}
        ]
    });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    if (looking_book) return 'Submitting...';
    if (add_book_error) return `Submission error! ${error.message}`;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formState.name && formState.genre && formState.authorId){
            mutateFunction({variables:{
                name: formState.name,
                genre: formState.genre,
                authorId: formState.authorId
            }});
            setFormState({
                name: '',
                genre: '',
                authorId: ''
            });
        }
    };

    const authors = data.authors.map(
        (author) => {
            return (

                <option key={ author.id } value={author.id} >{ author.name }</option>
            )
        }
    )

    return (
        <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
            <label>Book name:</label>
            <input name='name' type="text" onChange={handleChange} />
        </div>
        <div className="field">
            <label>Genre:</label>
            <input name='genre' type="text" onChange={handleChange} />
        </div>
        <div className="field">
            <label>Author:</label>
            <select name='authorId' onChange={handleChange}>
                <option disabled >Select author</option>
                { authors }
            </select>
        </div>
        <button>+</button>

    </form>
    );
  }
  
  export default AddBook;
  