"use client";

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

import Profile from '@components/Profile';


const MyProfile = () => {

    const { data: session } = useSession();
    const router = useRouter();

    const [posts, setPosts] = useState([])

    // UseEffect to Fetch User Prompts
    useEffect(() => {

        if (session?.user.id) {

            (async function () {
                const response = await fetch(`/api/users/${session?.user.id}/posts`);
                const data = await response.json();

                setPosts(data);
                console.log(data);
            })();
        }

    }, [session?.user.id])


    // Edit Prompt Function
    const handleEdit = async (post) => {

        router.push(`/update-prompt?id=${post._id}`);

    }

    // Delete Prompt Function
    const handleDelete = async (post) => {

        const isConfirmed = confirm("Are you sure to delete this prompt?")

        if (isConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })

                const remainingPosts = posts.filter((singlePost) => singlePost._id !== post._id)

                setPosts(remainingPosts);

            } catch (error) {
                console.log(error);
            }
        }

    }

    return (
        <Profile
            name="My"
            description="Welcom to your profile page!"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile