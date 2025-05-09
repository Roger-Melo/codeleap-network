"use client"

import { Fragment } from "react"
import { EditPost } from "./edit-post"
import { DeletePost } from "./delete-post"
import { usePostsContext, useUsernameContext } from "@/lib/hooks"
import { getPostTimeCreation } from "@/lib/utils"
import { type Post } from "@/lib/types"

type PostProps = { post: Post }

function PostHeader({ post }: PostProps) {
  const { usernameState } = useUsernameContext()
  return (
    <header className="bg-primary-blue rounded-t-2xl p-5 flex flex-col gap-4 sm:flex-row sm:justify-between">
      <h3 className="text-2xl sm:text-2xl font-bold text-white">{post.title}</h3>
      {post.username === usernameState && (
        <nav className="sm:flex sm:flex-col sm:justify-center">
          <ul className="flex gap-4 sm:gap-6 justify-end">
            <li><EditPost postId={post.id} /></li>
            <li><DeletePost postId={post.id} /></li>
          </ul>
        </nav>
      )}
    </header>
  )
}

function PostInfo({ post }: PostProps) {
  return (
    <div className="text-lg text-primary-darkest-gray sm:flex sm:justify-between sm:items-center">
      <h4 className="font-bold">@{post.username}</h4>
      <p className="text-xs sm:text-sm">
        <time dateTime={post.created_datetime}>
          {getPostTimeCreation(post.created_datetime)}
        </time>
      </p>
    </div>
  )
}

function PostText({ post }: PostProps) {
  const paragraphs = post.content.split(/\n{2,}/g)
  return paragraphs.map((paragraph, i) =>
    <p key={i}>
      {paragraph.split("\n").map((line, j) => (
        <Fragment key={j}>
          {line}
          <br />
        </Fragment>
      ))}
    </p>
  )
}

function Post({ post }: PostProps) {
  return (
    <li>
      <section>
        <PostHeader post={post} />
        <section className="p-5 border border-primary-dark-gray rounded-b-2xl border-t-0 flex flex-col gap-4">
          <PostInfo post={post} />
          <article className="text-lg flex flex-col gap-3">
            <PostText post={post} />
          </article>
        </section>
      </section>
    </li>
  )
}

export function PostsList() {
  const { posts } = usePostsContext()
  return posts.length === 0
    ? <h2 className="mx-auto text-center">Please create a first post</h2>
    : (
      <ul className="flex flex-col gap-6">
        {posts.map((post) => <Post key={post.id} post={post} />)}
      </ul>
    )
}
