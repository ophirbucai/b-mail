import PropTypes from "prop-types";
import { nullablePropType } from "../utils/nullablePropType.js";

export const TMail = PropTypes.shape({
    id: PropTypes.string.isRequired,
    subject: PropTypes.string,
    body: PropTypes.string,
    isRead: PropTypes.bool,
    isStarred: PropTypes.bool,
    sentAt: PropTypes.number,
    removedAt: nullablePropType(PropTypes.number),
    from: PropTypes.string,
    to: PropTypes.string
})
