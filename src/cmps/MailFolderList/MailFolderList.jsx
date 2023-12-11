import { useMailContext } from "../../context/MailContextProvider.jsx";
import {
    // LucideBug,
    // LucideClipboard,
    // LucideMailWarning,
    LucideMailbox,
    LucideSend,
    LucideStar,
    LucideTrash2
} from "lucide-react";
import { classnames } from "../../utils/classnames.js";
import { useUrl } from "../../hooks/useUrl.jsx";

export const mappedFilterFolders = {
    "Inbox": "inbox",
    "Starred": "starred",
    "Sent": "sent",
    // "Drafts": "drafts",
    "Trash": "trash",
    // "Spam": "spam",
    // "Important": "important"
}

const mappedFilterIcons = {
    "Inbox": LucideMailbox,
    "Starred": LucideStar,
    "Sent": LucideSend,
    // "Drafts": LucideClipboard,
    "Trash": LucideTrash2,
    // "Spam": LucideBug,
    // "Important": LucideMailWarning
}
export function MailFolderList() {
    const { updateUrl } = useUrl()
    const { folder, onSelectFolder, viewedCount } = useMailContext()

    return (
        <div>
            <nav>
                <ul className="clean-list mail-folder-list">
                    {Object.keys(mappedFilterFolders).map((label, idx) => {
                        const Icon = mappedFilterIcons[label]
                        const key = mappedFilterFolders[label];
                        return (
                            <li key={idx}>
                                <button data-title={label} className={classnames("flex gap20 align-center", folder === key && "active")} onClick={() => {
                                    onSelectFolder(key);
                                    updateUrl("folder", key)
                                }}>
                                    <div><Icon size="1em"/><span>{label}</span></div>{folder === key && "active" && <span className="count">{viewedCount}</span>}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}