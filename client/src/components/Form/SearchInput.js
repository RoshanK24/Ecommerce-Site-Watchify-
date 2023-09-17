import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [values, setValue] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const {data} = await axios.get(`/api/v1/product/search/${values.keyword}`);
            setValue({...values, result:data});
            navigate('/search');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form className="form-inline d-flex flex-row mt-1" onSubmit={handleSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e) => setValue({ ...values, keyword: e.target.value })} />
                <button className="btn btn-outline-light mx-2" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchInput