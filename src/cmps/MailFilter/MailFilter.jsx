import PropTypes from "prop-types";
import { MailFilterAscButtons } from "./MailFilterAscButtons/MailFilterAscButtons.jsx";
import { MailFilterSearch } from './MailFilterSearch/MailFilterSearch.jsx';





export function MailFilter() {
    return (
        <>
                <MailFilterSearch />
                <MailFilterAscButtons />
        </>
    )
}
