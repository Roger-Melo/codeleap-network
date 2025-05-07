"use client"

import { PostForm } from "@/components/post-form"

export function CreatePostSection () {
  return (
    <section className="border border-primary-dark-gray rounded-2xl p-5 space-y-6">
      <PostForm actionType="add" />
    </section>
  )
}
