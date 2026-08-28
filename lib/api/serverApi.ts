import { nextServer } from "./api";
import { NotesHttpResponse } from "./clientApi";

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