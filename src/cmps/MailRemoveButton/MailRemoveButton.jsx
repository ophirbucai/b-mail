import { TMail } from "../../types/TMail.jsx";
import { LucideRedo2, LucideTrash2 } from "lucide-react";
import PropTypes from "prop-types";

export function MailRemoveButton({ mail, onToggleRemoveEmail, onPermanentDeleteMail }) {
    return (
        <>
            <button className="simple-button tooltip p10" onClick={mail.removedAt ? onPermanentDeleteMail : onToggleRemoveEmail}>
                <LucideTrash2 size="1.2em" /><span role="tooltip" hidden>{mail.removedAt ? "Delete Forever" : "Move To Trash"}</span>
            </button>
            {mail.removedAt && (
                <button className="simple-button tooltip p10" onClick={onToggleRemoveEmail}>
                    <LucideRedo2 size="1.2em" /><span role="tooltip" hidden>Retrieve</span>
                </button>
            )}
        </>
    )
}

MailRemoveButton.propTypes = {
    mail: TMail.isRequired,
    onToggleRemoveEmail: PropTypes.func.isRequired,
    onPermanentDeleteMail: PropTypes.func.isRequired,
}