import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { mailService } from "../services/mailService.js";
import { Loading } from "../cmps/Layout/Loading/Loading.jsx";

const MailContext = createContext({
    viewedMail: [],
    addMail: () => { },
    updateMail: () => { },
    removeMail: () => { },
    getMailById: () => { },
    search: "",
    onSearch: () => { },
    clearSearch: () => { },
    sortAsc: {},
    toggleSortAsc: () => { },
    addSortAsc: () => { },
    removeSortAsc: () => { },
})

export const MailContextProvider = () => {
    const [_mail, _setMail] = useState(null);
    const [viewedMail, setViewedMail] = useState(null);
    const [search, setSearch] = useState("");
    const [sortAsc, setSortAsc] = useState({
        sentAt: false,
        subject: false,
        to: false,
    });

    const value = {
        viewedMail,
        /* Mail */
        addMail: (mail) => {
            _setMail(prevMail => [mail, ...prevMail])
        },
        updateMail: (mail) => {
            const mailIdx = _mail.findIndex(currMail => currMail.id === mail.id)
            const newMails = [..._mail]
            newMails[mailIdx] = mail
            _setMail(newMails)
        },
        removeMail: (mailId) => {
            _setMail(prevMails => {
                return prevMails.filter(mail => mail.id !== mailId)
            })
        },
        getMailById: (mailId) => {
            return [..._mail].find(mail => mail.id === mailId)
        },
        /* Search */
        search,
        onSearch: (search) => {
            setSearch(search)
        },
        clearSearch: () => {
            setSearch("")
        },
        /* SortAsc */
        sortAsc,
        toggleSortAsc: (sortProperty) => {
            setSortAsc(prevSortAsc => {
                const newSortAsc = { ...prevSortAsc, [sortProperty]: !prevSortAsc[sortProperty] }
                return newSortAsc
            })
        },
        addSortAsc: (sortProperty) => {
            setSortAsc(prevSortAsc => {
                return { ...prevSortAsc, [sortProperty]: false }
            })
        },
        removeSortAsc: (sortProperty) => {
            setSortAsc(prevSortAsc => {
                const newSortAsc = { ...prevSortAsc }
                delete newSortAsc[sortProperty]
                return newSortAsc
            })
        },
    }


    useEffect(() => {
        loadMails()

    }, [])

    useEffect(() => {
        if (!_mail) return;
        function loadViewedMail() {
            setViewedMail(() => {
                let mail = [..._mail]
                if (search) {
                    mail = mail.filter(mail => {
                        return Object.keys(mail).some(key => {
                            if (typeof mail[key] === "string") {
                                return mail[key].toLowerCase().includes(search.toLowerCase())
                            }
                            return false
                        })
                    })
                }
                if (Object.keys(sortAsc).length) {
                    const sortAscKeys = Object.keys(sortAsc)
                    mail = mail.sort((mailA, mailB) => {
                        for (let i = 0; i < sortAscKeys.length; i++) {
                            const sortProperty = sortAscKeys[i]
                            if (mailA[sortProperty] < mailB[sortProperty]) return sortAsc[sortProperty] ? -1 : 1
                            if (mailA[sortProperty] > mailB[sortProperty]) return sortAsc[sortProperty] ? 1 : -1
                        }
                        return 0
                    })
                }
                return mail;
            })
        }

        loadViewedMail()

    }, [_mail, search, sortAsc])

    async function loadMails() {
        try {
            const data = await mailService.query()
            _setMail(data)
            setViewedMail(data)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <MailContext.Provider value={value}>
            {viewedMail === null ? <Loading /> : <Outlet />}
        </MailContext.Provider>
    )
};


export const useMailContext = () => {
    const context = useContext(MailContext);
    if (!context) {
        throw new Error("useMailContext must be used within a MailContextProvider");
    }
    return context;
}
