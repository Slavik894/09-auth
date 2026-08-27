import { nextServer } from "./api";

export const fetchNotes = async (searchText: string, tag?: string, page?: number) => {
    const res = await axios.get<NotesHttpResponse>("/notes", {
        params: {
            page: page,
            perPage: 12,
            search: searchText,
            tag: tag,
        },
        headers:{
            Authorization: `Bearer ${myToken}`
        }
    });
    return res.data;
};

export const getSingleNote = async (id: string) => {
    const res = await axios.get(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${myToken}`
        }
    });
    return res.data;
}