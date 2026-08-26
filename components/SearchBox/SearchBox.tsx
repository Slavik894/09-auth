import{useDebouncedCallback} from "use-debounce"
import css from "./SearchBox.module.css"

interface SearchBoxProps{
    onSearch: (value: string)=> void;
}

export default function SearchBox({onSearch}: SearchBoxProps){

    const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {onSearch(e.target.value);}, 300);

    return(
        <div>
            <input type="text" placeholder="Search notes" onChange={handleChange} className={css.input}/>
        </div>
    )
}