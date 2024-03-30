"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    const [userPosts, setUserPosts] = useState([]);

    // UseEffect to Fetch Users Prompts
    useEffect(() => {

        if (params?.id) {
            (async function () {
                const response = await fetch(`/api/users/${params?.id}/posts`);
                const data = await response.json();

                setUserPosts(data);
            })();
        }

    }, [params.id]);

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            data={userPosts}
        />
    );
};

export default UserProfile;