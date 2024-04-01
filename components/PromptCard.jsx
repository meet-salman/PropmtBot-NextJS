"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");


  const handleProfileClick = () => {

    if (post.creator._id === session.user.id) return router.push('/profile');

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);

  }

  // Copy Prompt Function
  const handleCopy = () => {

    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => setCopied(""), 3000);
  }

  return (
    <div className="prompt_card">

      {/* Profile Area */}
      <div className="flex justify-between items-start gap-5">

        {/* User Details */}
        <div onClick={handleProfileClick} className="flex-1 flex justify-start items-center gap-3 cursor-pointer ">

          {/* Profile Image */}
          <Image
            src={post.creator.image}
            className="rounded-full object-contain"
            alt="user_image"
            width={40}
            height={40}
          />

          {/* Username & Email */}
          <div className="flex flex-col">
            <h3 className="username"> {post.creator.username} </h3>
            <p className="font-inter text-sm text-gray-300"> {post.creator.email} </p>
          </div>

        </div>


        {/* Copy Icon */}
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/copied.png"
                : "/assets/icons/copy.png"
            }
            width={12}
            height={12}
          />
        </div>

      </div>


      {/* Content Area  */}

      {/* Prompt */}
      <p className="prompt_text"> {post.prompt} </p>

      {/* Tags */}
      <p
        className="tag"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>


      {/* Edit & Delete Actions */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (

        <div className="mt-5 pt-3 flex-end gap-4 border-t border-gray-800 ">

          {/* Edit Prompt Button */}
          <p
            onClick={handleEdit}
            className="font-inter text-sm text-blue-500  cursor-pointer"
          >
            Edit
          </p>

          {/* Delete Prompt Button */}
          <p
            onClick={handleDelete}
            className="font-inter text-sm text-red-500 cursor-pointer"
          >
            Delete
          </p>

        </div>

      )}

    </div>
  )
}

export default PromptCard
