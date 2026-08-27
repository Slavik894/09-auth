import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api";
import NoteDetailsClient from "@/app/(private routes)/notes/[id]/NoteDetails.client";
import { Metadata } from "next";


type MetadataProps = {
    params: Promise<{id: string}>
}

export async function generateMetadata({ params }:  MetadataProps): Promise<Metadata> {
  const { id } = await params
  const note = await getSingleNote(id)
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph:{
    title: `${note.title}`,
    description: note.content.slice(0, 30),
    url: `https://08-zustand-five-sandy.vercel.app/notes/${id}`,
    images:[
      { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub logo"
      }
    ]
  }
  }
}

type Props ={
    params: Promise<{id: string}>;
};

 const NoteDetails = async ({params}: Props) =>{
    const {id} = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey:["note", id],
        queryFn: () => getSingleNote(id),
    });

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient/>
        </HydrationBoundary>
    )
}

export default NoteDetails

