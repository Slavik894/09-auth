import { Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";



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
        }
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

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export type UpdateUserRequest = {
  username: string;
};

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};