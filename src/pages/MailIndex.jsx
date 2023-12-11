import { MailList } from "../cmps/MailList/MailList.jsx";
import { MailFilter } from "../cmps/MailFilter/MailFilter.jsx";
import { Outlet, Link } from "react-router-dom";
import { LucideMail } from "lucide-react";
import { useMailContext } from "../context/MailContextProvider.jsx";

export function MailIndex() {
    const { viewedMail } = useMailContext();

    return (
        <>
            <main className="mail-index flex">
                <aside className="m10">
                    <section className="bottom-divider m5">
                        <Link to="/mail/compose" className="primary-button large inline-flex align-center gap5">
                            <LucideMail size="1em" />
                            <span>Compose</span>
                        </Link>
                    </section>
                </aside>
                <div className="p10 full-grow">
                    <MailFilter />
                    <MailList mails={viewedMail} />
                </div>
            </main>
            <Outlet />
        </>
    )
}