import { useState } from 'react';
import { LucideX } from "lucide-react";
import { classnames } from "../../utils/classnames.js";
import { MailComposeForm } from "./MailComposeForm/MailComposeForm.jsx";
import { useNavigate } from "react-router-dom";
import { useUrl } from "../../hooks/useUrl.jsx";
import { initialFormValues } from "./MailComposeForm/initialFormValues.js";

export function MailCompose() {
    const { getUrl, deleteUrl } = useUrl()
    const navigate = useNavigate();
    const [closing, setClosing] = useState(false)

    function onDelayedClose() {
        Object.keys(initialFormValues).forEach(deleteUrl);
        navigate(getUrl("/mail"));
    }

    return (
        <div className={classnames("mail-compose normBackground", closing && "closing")} onAnimationEnd={closing ? onDelayedClose : undefined}>
            <header className="flex space-between align-center">
                <h3 className="p10">New Message</h3>
                {/*<button onClick={() => setFullScreen(true)}><LucideMaximize2 size={iconSize} /></button>*/}
                <button className="simple-button p10 close" onClick={() => setClosing(true)}><LucideX size="1rem" strokeWidth={4}/></button>
            </header>
            <MailComposeForm onClose={onDelayedClose} />
        </div>
    );
}
