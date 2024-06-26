import React from "react"
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full mb-10 flex-start flex-col">

      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Post </span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-Powerws platform.
      </p>

      <form onSubmit={handleSubmit} className="form_box" >

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-300"> Your AI Prompt </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write Your Prompt Here"
            className="form_textarea"
          />

        </label>



        <label>
          <span className="font-satoshi font-semibold text-base text-gray-300">
            Tag <span className="font-normal"> (product, webdevelopment, idea) </span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            className="form_input"
            required
          />

        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-300 text-sm"> Cancel </Link>

          <button type="submit" disabled={submitting} className="color_btn" >
            {submitting ? `${type}...` : type}
          </button>

        </div>

      </form>

    </section>
  )
}

export default Form
