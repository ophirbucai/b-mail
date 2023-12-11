import { LucideChevronDown, LucidePlus, LucideTrash2 } from "lucide-react";
import { useMailContext } from "../../../context/MailContextProvider.jsx";
import PropTypes from "prop-types";

const mappedSortAsc = {
    sentAt: "Date",
    subject: "Subject",
    to: "To",
}

export function MailFilterAscButtons() {
    const { sortAsc, viewedMail } = useMailContext();
    return (
        <div className="mail-filter-asc-buttons p10">
            {viewedMail.length > 0 && <div className="flex gap10">
                {Object.keys(mappedSortAsc).map((key) => sortAsc.hasOwnProperty(key) ? (
                    <MailFilterAscToggleButton key={key} name={key} />
                ) : (
                    <MailFilterAscAddButton key={key} name={key} />
                ))}
            </div>}
        </div>
    )
}


function MailFilterAscToggleButton({ name }) {
    const { sortAsc, toggleSortAsc, removeSortAsc } = useMailContext();

    return (
        <label className="outlined-button small filter-asc">
            <LucideChevronDown size="1em" className="fast-trans" style={sortAsc[name] ? { rotate: "180deg" } : { translate: "0 0.1em" }}/>
            <span className="capitalize">{mappedSortAsc[name]}</span>
            <input
                type="checkbox"
                hidden
                name={`${name}`}
                checked={sortAsc[name]}
                onChange={() => toggleSortAsc(name)}
            />
            <button className="simple-button small filter-asc-remove normal-trans" onClick={() => removeSortAsc(name)}><LucideTrash2 size="0.8em"/>
            </button>
        </label>
    )
}

function MailFilterAscAddButton({ name }) {
    const { addSortAsc } = useMailContext();

    return (
        <button className="outlined-button small" onClick={() => addSortAsc(name)}>
            <LucidePlus size=".8em" strokeWidth=".25em" strokeLinecap="square" />
            <span className="capitalize" style={{ marginLeft: ".2em" }}>{mappedSortAsc[name]}</span>
        </button>
    )
}


MailFilterAscToggleButton.propTypes = {
    name: PropTypes.string
}

MailFilterAscAddButton.propTypes = MailFilterAscToggleButton.propTypes;