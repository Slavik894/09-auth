import { Note } from "@/types/note";
import { nextServer } from "./api";

export interface NotesHttpResponse{
    notes: Note[];
    page?: number;
    totalPages?: number;    
    tag?: string;
}

export const fetchNotes = async (searchText: string, tag?: string, page?: number) => {
    const res = await nextServer.get<NotesHttpResponse>("/notes", {
        params: {
            page: page,
            perPage: 12,
            search: searchText,
            tag: tag,
        },
    });
    return res.data;
};

export const getSingleNote = async (id: string) => {
    const res = await nextServer.get(`/notes/${id}`);
    return res.data;
}

export interface NewNote{
    title: string;
    content: string;
    tag: string
}

export const createNote = async(newNote: NewNote) =>{
    const res = await nextServer.post<Note>("/notes", newNote);
    return res.data;
}

export const deleteNote = async(noteId: string)=>{
    const res = await nextServer.delete<Note>(`/notes/${noteId}`);
    return res.data
}