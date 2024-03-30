"use client";

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard';


// Promp Cars List Component
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>

      {/* Render All Prompts Cards */}
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}

    </div>
  );
};


const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [allPrompts, setAllPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);


  // UseEffect to Fetch All Prompts
  useEffect(() => {

    (async function () {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setAllPrompts(data);
      // console.log(data);
    })();

  }, [])



  // Filter Prompts Function on Search
  function searchPrompts(val) {

    const searchResults = allPrompts.filter(result =>

      result.prompt.toLowerCase().includes(val.trim().toLowerCase()) ||
      result.tag.toLowerCase().includes(val.trim().toLowerCase()) ||
      result.creator.username.toLowerCase().includes(val.trim().toLowerCase())
    );

    val !== "" ? setFilteredPrompts(searchResults) : setFilteredPrompts([]);
  }

  // Setting Serch Value 
  const handleSearchChange = (e) => {

    setSearchText(e.target.value);

    searchPrompts(e.target.value);
  }

  // Filter Posts Containing Same Tags
  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    searchPrompts(tagName);
  }


  return (
    <section className='feed'>


      {/* Search Prompt Input Form */}
      <form className='relative w-full flex-center'>

        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder='Search for a tag or a username'
          className='search_input peer'
          required
        />

      </form>


      {/* Prompt Card List Components => Created Above the Feed Component */}
      {
        searchText ?
          <PromptCardList data={filteredPrompts} handleTagClick={handleTagClick} />
          :
          <PromptCardList data={allPrompts} handleTagClick={handleTagClick} />
      }


    </section >
  )
}

export default Feed
