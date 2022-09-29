import React from "react";
import Post from "./Post";

export default function Posts() {
    const posts = [
        {
            id: '1',
            username: 'zoeissick',
            userImg: 'https://pbs.twimg.com/profile_images/664169149002874880/z1fmxo00_400x400.jpg',
            img: 'https://img.theculturetrip.com/x/wp-content/uploads/2019/04/oregon--josemaria-toscano-shutterstock.jpg',
            caption: 'Oregon is so beautiful!'
        },{
            id: '2',
            username: 'zoeissick',
            userImg: 'https://pbs.twimg.com/profile_images/664169149002874880/z1fmxo00_400x400.jpg',
            img: 'https://electronic.vegas/wp-content/uploads/sites/4/2020/08/edc-las-vegas-2019-atmosphere.jpg',
            caption: 'Excited for EDC!'
        }
    ]
    
    return (
        <div>
            {posts.map(post => (
                <Post 
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    userImg={post.userImg}
                    img={post.img}
                    caption={post.caption}
                />
            ))}
        </div>
    )
}