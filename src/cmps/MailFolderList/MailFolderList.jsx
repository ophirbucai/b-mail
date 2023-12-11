import { useMailContext } from "../../context/MailContextProvider.jsx";
import { classnames } from "../../utils/classnames.js";
import { useUrl } from "../../hooks/useUrl.jsx";
import { mappedFilterFolders, mappedFilterIcons } from "./MailFolderList.constants.js";
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