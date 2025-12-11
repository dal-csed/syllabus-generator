"use client"

import { useEffect, useRef } from "react"

interface QuillEditorClientProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function QuillEditorClient({ value, onChange, placeholder }: QuillEditorClientProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<any>(null)
  const isUpdatingRef = useRef(false)

  useEffect(() => {
    const initQuill = async () => {
      if (!editorRef.current || quillRef.current) return

      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css"
      document.head.appendChild(link)

      const Quill = (await import("quill")).default

      const quill = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: placeholder || "Enter text...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        },
      })

      if (value) {
        quill.root.innerHTML = value
      }

      quill.on("text-change", () => {
        if (!isUpdatingRef.current) {
          onChange(quill.root.innerHTML)
        }
      })

      quillRef.current = quill
    }

    initQuill()

    return () => {
      if (quillRef.current) {
        quillRef.current = null
      }
    }
  }, [placeholder, onChange])

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      isUpdatingRef.current = true
      quillRef.current.root.innerHTML = value || ""
      isUpdatingRef.current = false
    }
  }, [value])

  return <div ref={editorRef} className="min-h-[150px]" />
}
