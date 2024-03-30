"use client";

import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    });


    // UseEffect to Get Edit Prompt Data
    useEffect(() => {

        if (promptId) {
            (async function () {
                const response = await fetch(`/api/prompt/${promptId}`);
                const data = await response.json();

                setPost({
                    prompt: data.prompt,
                    tag: data.tag
                })
            })();
        }

    }, [promptId])


    // Update Promp Function
    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert("Prompt ID not found!");

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (response.ok) {
                router.push('/profile');
            }

        } catch (error) {
            console.log(error);
        }
        finally {
            setSubmitting(false);
        }
    }

    return (

        <Suspense fallback={<div>Loading...</div>}>
            <Form
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}
            />
        </Suspense>


    )
}

export default EditPrompt
