import { LucideSearch } from "lucide-react";
import { useMailContext } from "../../../context/MailContextProvider.jsx";

export function MailFilterSearch() {
    const { search, onSearch } = useMailContext();

    return (
        <label className="mail-filter-search">
            <LucideSearch strokeWidth="2px" strokeLinecap="square" size="1em" />
            <input
                type="search"
                placeholder="Search"
                value={search}
                onChange={(ev) => onSearch(ev.target.value)}
            />
        </label>
    )
}
