import { useNavigate, useParams } from "react-router-dom";
import { useMailContext } from "../../context/MailContextProvider.jsx";
import { useEffect, useState } from "react";
import { Loading } from "../Layout/Loading/Loading.jsx";
import { LucideForward, LucideMail, LucideMailOpen, LucideReply, LucideTrash2 } from "lucide-react";
import { mailService } from "../../services/mailService.js";
import dayjs from "dayjs";
import { MailStarButton } from "../MailStarButton/MailStarButton.jsx";
import { useUrl } from "../../hooks/useUrl.jsx";

export function MailDetails() {
    const navigate = useNavigate()
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const { getUrl } = useUrl()
    const { updateMail } = useMailContext()

    useEffect(() => {
        async function loadMail() {
            try {
                const mail = await mailService.getById(mailId)
                setMail(mail)
            } catch (err) {
                console.log(err);
            }
        }

        loadMail();

    }, [mailId])


    async function onRemoveMail() {
        try {
            const updatedMail = await mailService.save({ ...mail, deletedAt: Date.now(), isRead: true });
            await updateMail(updatedMail)
            navigate(-1);
        } catch (err) {
            console.log(err);
        }
    }

    async function onMarkMailAsUnread() {
        try {
            const updatedMail = await mailService.save({ ...mail, isRead: !mail.isRead });
            updateMail(updatedMail);
            setMail(updatedMail);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="mail-details">
            {!mail ? <Loading /> : (
                <div className="mail-details-container">
                    <div className="mail-details-header">
                        <button onClick={() => navigate(getUrl("/mail"))} className="back-button simple-button"><span>←</span>{" "}<span>Back</span></button>
                        <button onClick={console.log} disabled className="simple-button tooltip p10"><LucideReply size="1.2em" /><span role="tooltip" hidden>Reply</span></button>
                        <button onClick={console.log} disabled className="simple-button tooltip p10"><LucideForward size="1.2em" /><span role="tooltip" hidden>Forward</span></button>
                        <button onClick={onRemoveMail} className="simple-button tooltip p10"><LucideTrash2 size="1.2em" /><span role="tooltip" hidden>Delete</span></button>
                        <button onClick={onMarkMailAsUnread} className="simple-button tooltip p10">{mail.isRead ? <LucideMailOpen size="1.1em" /> : <LucideMail size="1.1em" style={{ translate: "0 0.1em" }} />}<span role="tooltip" hidden>Mark As {mail.isRead ? "Unread" : "Read"}</span></button>
                        <MailStarButton mail={mail} onStarMail={(updatedMail) => setMail(updatedMail)} />
                    </div>
                    <div className="mail-details-body p10">
                        <div className="mail-details-body-header flex column gap5">
                            <div className="flex space-between">
                                <span>To: {mail.to}</span>
                                <small><strong>Author:</strong> {mail.from}</small>
                            </div>
                            <div className="flex space-between">
                                <h3><strong>Subject: {mail.subject}</strong></h3>
                                <small>{dayjs(mail.sentAt).format("MMMM DD, YYYY [@] H:mm A")}</small>
                            </div>
                        </div>
                        <div className="mail-details-body-content">
                            {mail.body}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}