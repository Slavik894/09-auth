import { cookies } from "next/headers";
import { nextServer } from "./api";
import { NotesHttpResponse } from "./clientApi";
import { User } from "@/types/user";

export const fetchNotes = async (searchText: string, tag?: string, page?: number) => {
    const res = await nextServer.get<NotesHttpResponse>("/notes", {
        params: {
            page: page,
            perPage: 12,
            search: searchText,
            tag: tag,
        },
        headers:{
            Cookie: cookieStore.toString(),
        }
    });
    return res.data;
};

export const getSingleNote = async (id: string) => {
    const res = await nextServer.get(`/notes/${id}`, {
         headers:{
            Cookie: cookieStore.toString(),
        }
    });
    return res.data;
}



export const checkSession = async () => {
    const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session',{
    headers:{
        Cookie: cookieStore.toString(),
    }
  });
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/auth/me',{
    headers:{
        Cookie: cookieStore.toString(),
    }
});
  return data;
};