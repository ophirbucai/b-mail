import { TMail } from "../../types/TMail.jsx";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { classnames } from "../../utils/classnames.js";
import { useNavigate } from "react-router-dom";
import { useUrl } from "../../hooks/useUrl.jsx";
import { MailStarButton } from "../MailStarButton/MailStarButton.jsx";
import { useMailContext } from "../../context/MailContextProvider.jsx";
import { mailService } from "../../services/mailService.js";

dayjs.extend(relativeTime)

export function MailPreview({ mail }) {
    const navigate = useNavigate();
    const { updateMail } = useMailContext();
    const { getUrl } = useUrl();
    if (!mail?.id) return null;
    async function onOpenMail() {
        try {
            const updatedMail = await mailService.save({ ...mail, isRead: true });
            updateMail(updatedMail);
            navigate(getUrl(`/mail/${mail.id}`));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <li className={classnames("mail-preview", !mail.isRead && "unread")}>
            <div role="button" className="mail-link" onClick={onOpenMail}></div>
            <MailStarButton mail={mail} />
            <span className="mail-to" title={mail.to}>{mail.to}</span>
            <span className="mail-subject">{mail.subject || <small>(No subject)</small>}</span>
            <span className="mail-content">{mail.body || <small>(No content)</small>}</span>
            <span className="mail-sent-at">{dayjs(mail.sentAt).fromNow()}</span>
        </li>
    )
}

MailPreview.propTypes = {
    mail: TMail
}