import { MailList } from "../cmps/MailList/MailList.jsx";
import { MailFilter } from "../cmps/MailFilter/MailFilter.jsx";
import { Outlet, Link, useParams } from "react-router-dom";
import { LucideMail } from "lucide-react";
import { MailFolderList } from "../cmps/MailFolderList/MailFolderList.jsx";
import { useUrl } from "../hooks/useUrl.jsx";

export function MailIndex() {
    const { mailId } = useParams()
    const { getUrl } = useUrl();
    return (
        <>
            <main className="mail-index flex">
                <aside>
                    <section className="mail-index-compose bottom-divider m10">
                        <Link to={getUrl("/mail/compose")} className="mail-index-compose-button primary-button large inline-flex align-center gap5">
                            <LucideMail size="1em"/>
                            <span>Compose</span>
                        </Link>
                    </section>
                    <MailFolderList/>
                </aside>
                {!mailId ? (
                    <div className="p10 full-grow">
                        <MailFilter/>
                        <MailList/>
                        <Outlet/>
                    </div>
                ) : <Outlet/>}
            </main>
        </>
    )
}