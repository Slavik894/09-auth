"use client"

import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css"
import Modal from "@/components/Modal/Modal";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api/clientApi";
import Loading from "@/app/loading";


export default function NotePreviewClient(){
    const router = useRouter();
    const  {id} = useParams<{id: string}>();
    const {data, isLoading, isError} = useQuery({
        queryKey:["note", id],
        queryFn: ()=>getSingleNote(id),
        refetchOnMount: false,
    })

    const handleClose = () => {router.back();}
    return(
         <Modal onClose={handleClose}>
          {isLoading && <Loading/>}
            <button className={css.backBtn} onClick={handleClose}>← Back</button>
      <div className={css.container}>
		<div className={css.item}>
		  <div className={css.header}>
		    <h2>{data?.title}</h2>
		  </div>
		  <p className={css.tag}>{data?.tag}</p>
		  <p className={css.content}>{data?.content}</p>
		  <p className={css.date}>{data?.createdAt}</p>
		</div>
	</div>

      {isError && <p>Something went wrong. Please try again</p>}
    </Modal>
    )
}