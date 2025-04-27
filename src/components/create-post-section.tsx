"use client"

import { useRef } from "react"
import { PostForm } from "@/components/post-form"

export function CreatePostSection() {
  const formRef = useRef<HTMLFormElement>(null)

  function handleFormReset() {
    formRef.current?.reset()
  }

  return (
    <section className="border border-primary-dark-gray rounded-2xl p-5 space-y-6">
      <PostForm actionType="add" ref={formRef} onFormSubmission={handleFormReset} />
    </section>
  )
}
