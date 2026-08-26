"use client";

import { getSingleNote } from "@/lib/api";
import css from "./NoteDetails.client.module.css"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation";
import Loading from "@/app/loading";



const NoteDetailsClient = () =>{
	const {id} = useParams<{id: string}>();

	const {data: note, isLoading, isError} = useQuery({
		queryKey: ["note", id],
		queryFn: () => getSingleNote(id),
		refetchOnMount: false,
	})

	if (isLoading){
			return <Loading/>
		}

	if(isError || !note){
		return "An error has occured. Please try again"
	}

    return(
        <main className={css.main}>	
	<div className={css.container}>
		<div className={css.item}>
		  <div className={css.header}>
		    <h2>{note.title}</h2>
		  </div>
		  <p className={css.tag}>{note.tag}</p>
		  <p className={css.content}>{note.content}</p>
		  <p className={css.date}>{note.createdAt}</p>
		</div>
	</div>
</main>

    )
};

export default NoteDetailsClient;