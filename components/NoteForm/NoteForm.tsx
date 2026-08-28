"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";

import css from "./NoteForm.module.css"

export default function NoteForm(){
    const router = useRouter();
    const queryClient = useQueryClient();
    const {draft, setDraft, clearDraft} = useNoteDraftStore();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,)=>{
        setDraft({
            ...draft,
            [event.target.name]: event.target.value,
        });
    };

    const handleCancel = () => router.push('/notes/filter/all');


    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["notes"]});
            clearDraft();
            router.push('/notes/filter/all');
        }
    })

    const handleSubmit = (formData: FormData): void =>{
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const tag = formData.get("tag") as string;

        mutation.mutate({
            title,
            content, 
            tag
        });
    };

    return(
<form className={css.form} action={handleSubmit}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" name="title" defaultValue={draft?.title} onChange={handleChange} className={css.input} minLength={3} maxLength={50}/>
                </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                id="content"
                name="content"
                defaultValue={draft?.content}
                onChange={handleChange}
                rows={8}
                className={css.textarea}
                maxLength={500}
                />
            </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <select id="tag" name="tag" className={css.select} defaultValue={draft?.tag} onChange={handleChange}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={handleCancel}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={mutation.isPending}
        
    >
      Create note
    </button>
  </div>
</form>
)
}