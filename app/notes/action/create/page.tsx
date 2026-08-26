import css from "./createNote.module.css"
import { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
    title: "Create note",
    description: "Create a new note page",
    openGraph:{
    title: "Create note",
    description: "Create a new note page",
    url: "https://08-zustand-five-sandy.vercel.app/notes/action/create",
    images:[
      { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub logo"
      }
    ]
}
}

export default function CreateNote(){

    return(
     <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
        <NoteForm />
  </div>
</main>

    )
    };


