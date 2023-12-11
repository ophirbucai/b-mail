import { MailPreview } from "../MailPreview/MailPreview.jsx";
import PropTypes from "prop-types";
import { TMail } from "../../types/TMail.jsx";
import { useUrl } from "../../hooks/useUrl.jsx";
import { useMailContext } from "../../context/MailContextProvider.jsx";
import { useNavigate } from "react-router-dom";

export function MailList({ mails = [] }) {
    const navigate = useNavigate()
    const { search, clearSearch } = useMailContext()
    const { getUrl } = useUrl()
    return (
        <div>
            <ul className="clean-list mail-list">
                {mails ? mails.length ? mails.map(mail => (
                        <MailPreview key={mail.id} mail={mail} />
                    )
                ) : (
                    <div className="flex auto-center p20 gap10 column">
                        {search.trim() ? <span>No mails found for "{search}"</span> : <span>You don't have any mail, feel lonely?</span>}
                        <button onClick={search.trim() ? clearSearch : navigate(getUrl("/mail/compose"))} className="primary-button">
                            {search.trim() ? "Clear Search" : "Mail a friend"}
                        </button>
                    </div>
                ) : <li>Loading your mails...</li>}
            </ul>
        </div>
    )
}

MailList.defaultProps = {
    mails: []
}
MailList.propTypes = {
    mails: PropTypes.arrayOf(TMail)
}