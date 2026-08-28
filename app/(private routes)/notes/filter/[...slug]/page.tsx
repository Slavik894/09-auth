import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/serverApi";
import { Metadata } from "next";

export async function generateMetadata({ params }: NotesByCategoryProps): Promise<Metadata> {
  const { slug } = await params
  const category = slug[0] === 'all' ? undefined : slug[0];
  return {
    title: `${category} `,
    description: `${category} category`,
    openGraph:{
    title: `${category}`,
    description: `${category} category`,
    url: `https://08-zustand-five-sandy.vercel.app/notes/filter/${category}`,
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

type NotesByCategoryProps = {
    params: Promise<{slug: string[]}>
};

export default async function NotesByCategory({params}: NotesByCategoryProps){
    const {slug} = await params;
    const category = slug[0] === 'all' ? undefined : slug[0];
    
     const queryClient = new QueryClient();
    const searchQuery = '';
    const currentPage = 1;

    await queryClient.prefetchQuery({
        queryKey:["notes", searchQuery, currentPage, category],
        queryFn:()=>fetchNotes(
            searchQuery,
            category,
            currentPage
        )
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={category}/>
        </HydrationBoundary>
    )
}