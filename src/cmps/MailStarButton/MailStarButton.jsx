import { classnames } from "../../utils/classnames.js";
import { LucideStar } from "lucide-react";
import PropTypes from "prop-types";
import { TMail } from "../../types/TMail.jsx";
import { mailService } from "../../services/mailService.js";
import { useMailContext } from "../../context/MailContextProvider.jsx";

export function MailStarButton({ mail, onStarMail }) {
    const { updateMail } = useMailContext();

    async function _onStarMail() {
        try {
            const updatedMail = { ...mail, isStarred: !mail?.isStarred };
            await mailService.save(updatedMail);
            onStarMail && onStarMail(updatedMail);
            updateMail(updatedMail);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <button onClick={_onStarMail} className={classnames("simple-button mail-star p5 tooltip", mail.isStarred && "starred")}>
            <LucideStar size="1em" /><span role="tooltip" hidden>{mail.isStarred ? "Unstar Mail" : "Star Mail"}</span>
        </button>
    )
}

MailStarButton.propTypes = {
    mail: TMail.isRequired,
    onStarMail: PropTypes.func
}