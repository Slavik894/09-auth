import { getSingleNote } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";

interface NotePrewiewProps{
	params: Promise<{id: string}>
}
export default async function NotePreview({params}: NotePrewiewProps){
	const {id} = await params;
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey:["note", id],
		queryFn: ()=>getSingleNote(id),
	})
	return(
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NotePreviewClient/>
		</HydrationBoundary>
	)
}