"use client"

import {useState } from 'react'
import SearchBox from "@/components/SearchBox/SearchBox"
import css from "./NotesPage.module.css"
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchNotes, type NotesHttpResponse } from '@/lib/api/clientApi'
import Pagination from '@/components/Pagination/Pagination'
import NoteList from '@/components/NoteList/NoteList'
import { useDebouncedCallback } from 'use-debounce'
import Loading from '@/app/loading'
import Link from 'next/link'

type Props = {
   tag?: string;
}

export default function NotesClient({tag}: Props) { 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("")

  const handleSearch = useDebouncedCallback((value: string) =>{
    setSearchText(value);
    setCurrentPage(1);
  }, 300);
  const {data, isLoading} = useQuery<NotesHttpResponse>({
    queryKey: ["notes", currentPage, searchText, tag],
    queryFn: ()=> fetchNotes( searchText, tag, currentPage),
    placeholderData: keepPreviousData
  });
  
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;
  
  
    return (
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={handleSearch}/>
          {totalPages>1 && (<Pagination 
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
  
                            />)}
          <Link className={css.button} href="/notes/action/create">Create note +</Link>
        </header>
        {isLoading && <Loading/>}
        {notes.length > 0 && !isLoading && <NoteList notes={notes}/>}
        
        {notes.length === 0 && !isLoading && <p>There is no notes for this tag</p>}
      </div>
    )

};

