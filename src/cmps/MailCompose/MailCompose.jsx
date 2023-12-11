import { useState } from 'react';
import { LucideX } from "lucide-react";
import { z } from "zod";
import { mailService } from "../../services/mailService.js";
import { useMailContext } from "../../context/MailContextProvider.jsx";
import { useUrl } from "../../hooks/useUrl.jsx";
import { useNavigate } from "react-router-dom";
import { classnames } from "../../utils/classnames.js";

const mailSchema = z.object({
    to: z.string().email("Please enter a valid Email address"),
    subject: z.string().optional(),
    body: z.string().min(2, "Your message is too short!")
})

const fromMail = "testing@bmail.io";
export function MailCompose() {
    const { getUrl, updateUrl, searchParams, deleteUrl } = useUrl();
    const { addMail } = useMailContext();
    const navigate = useNavigate();
    const [closing, setClosing] = useState(false);
    const [formValues, setFormValues] = useState({
        to: searchParams.get("to") || "",
        subject: searchParams.get("subject") || "",
        body: searchParams.get("body") || ""
    })
    const [formErrors, setFormErrors] = useState({});

    function register(name, modifier) {
        return {
            name,
            value: formValues[name],
            onChange: (e) => {
                const value = modifier ? modifier(e.target.value) : e.target.value;
                setFormValues(prevFormValues => ({ ...prevFormValues, [name]: value }))
                handleChange(name, value)
            },
            onBlur: (e) => e.target.value.trim() && validate(name, e.target.value.trim()),
            autoComplete: "off"
        }
    }

    function handleChange(name, value) {
        if (value.trim()) {
            setFormValues({ ...formValues, [name]: value });
        } else {
            setFormErrors(prevFormError => ({ ...prevFormError, [name]: "" }));
        }
        updateUrl(name, value);
        if (formErrors[name]) validate(name, value);
    }

    async function sendMail(e) {
        e.preventDefault();
        validate(); // Validate all fields
        try {
            const mail = await mailService.save({ ...formValues, from: fromMail });
            addMail(mail);
            onDelayedClose();
        } catch (err) {
            console.log(err);
        }
    }

    function validate(name, value) {
        try {
            if (name) {
                mailSchema.partial().parse({ [name]: value });
                setFormErrors(prevFormError => ({ ...prevFormError, [name]: "" }));
            } else {
                mailSchema.parse(formValues);
                setFormErrors({});
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                if (name) {
                    const errorMessage = error.errors.find(error => error.path[0] === name)?.message;
                    if (errorMessage) {
                        setFormErrors(prevFormError => ({ ...prevFormError, [name]: errorMessage }));
                    }
                } else {
                    const formErrors = {};
                    error.errors.forEach(error => {
                        formErrors[error.path[0]] = error.message;
                    });
                    setFormErrors(formErrors);
                }
            } else {
                console.log(error);
            }
        }
    }

    function onDelayedClose() {
        Object.keys(formValues).forEach(deleteUrl);
        navigate(getUrl("/mail"));
    }


    return (
        <div className={classnames("mail-compose normBackground", closing && "closing")} onAnimationEnd={closing ? onDelayedClose : undefined}>
            <header className="flex space-between align-center">
                <h3 className="p10">New Message</h3>
                {/*<button onClick={() => setFullScreen(true)}><LucideMaximize2 size={iconSize} /></button>*/}
                <button className="simple-button p10 close" onClick={() => setClosing(true)}><LucideX size="1rem" strokeWidth={4}/></button>
            </header>
            <form onSubmit={sendMail} className="simple-form">
                <label>
                    <span>From</span>
                    <input defaultValue={fromMail} disabled/>
                </label>
                <label className="bottom-divider" data-error={formErrors.to || undefined}>
                    <span>To</span>
                    <input {...register("to")} type="email" autoFocus={!formValues.to}/>
                </label>
                <label className="bottom-divider">Subject
                    <input {...register("subject")} placeholder="(optional)"/>
                </label>
                <label data-error={formErrors.body || undefined}>
                    <textarea {...register("body")} rows={7} style={{ resize: "none" }} autoFocus={!!formValues.to}/>
                </label>
                <button className="primary-button" disabled={!mailSchema.safeParse(formValues).success} type="submit">Send</button>
            </form>
        </div>
    );
}
