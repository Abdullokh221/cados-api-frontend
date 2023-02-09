import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const HomePage = () => {

  const [advocates, setAdvocates] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  let getData = async (query = '') => {
    // let response = await axios.get(`https://cados.up.railway.app/advocates?query=${query}`)
    let response = await axios.get(`http://127.0.0.1:8000/advocates?query=${query}`)
    setAdvocates(response.data)
    // setTotal(response.data.total)
    // setPagination(response.data.pagination)
  }

  let searchData = (e) => {
    e.preventDefault()
    let query = e.target.query.value
    getData(query)
  }

  return (
    <div className='main__container'>
      <h1>Search {total} developer advocates found by @denisivy's webscraper and the TwitterAPI.</h1>
      <p>{pagination?.results_found} Developer advocates found</p>
      <div className='form__wrapper'>
        <form onSubmit={searchData} id='search_form'>
          <input type="text" name="query" placeholder='search advocates...'/>
          <input type='submit' value='Search' className='btn__primary'/>
        </form>
      </div>

      <div className='advocate__list'>
        {advocates.map((advocate, index) => (
            <div className='advocate__preview__wrapper' key={index}>
          
              <div className='advocate__preview__header'>
                <Link to={`/advocate/${advocate.username}`}>
                  <img className='advocate__preview__image' src={advocate.profile_pic}/>
                </Link>
                <div>
                  <strong>{advocate.name}</strong>
                  <br/>
                  <a href={advocate.twitter}>@{advocate.username}</a>
                </div>
              </div>
              <p className='bio__preview'>{advocate.bio}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
