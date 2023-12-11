import {
    // LucideBug,
    // LucideClipboard,
    // LucideMailWarning,
    LucideMailbox,
    LucideSend,
    LucideStar,
    LucideTrash2
} from "lucide-react";

export const mappedFilterFolders = {
    "Inbox": "inbox",
    "Starred": "starred",
    "Sent": "sent",
    // "Drafts": "drafts",
    "Trash": "trash",
    // "Spam": "spam",
    // "Important": "important"
}

export const mappedFilterIcons = {
    "Inbox": LucideMailbox,
    "Starred": LucideStar,
    "Sent": LucideSend,
    // "Drafts": LucideClipboard,
    "Trash": LucideTrash2,
    // "Spam": LucideBug,
    // "Important": LucideMailWarning
}