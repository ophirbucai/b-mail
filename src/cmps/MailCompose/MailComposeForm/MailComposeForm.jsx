import { user } from "../../../context/User.jsx";
import { mailService } from "../../../services/mailService.js";
import { z } from "zod";
import { useUrl } from "../../../hooks/useUrl.jsx";
import { useMailContext } from "../../../context/MailContextProvider.jsx";
import PropTypes from "prop-types";
import { mailSchema } from "./schema.js";
import { useState } from "react";
import { initialFormValues } from "./initialFormValues.js";

export function MailComposeForm({ onClose }) {
    const { updateUrl, searchParams, deleteUrl } = useUrl();
    const { addMail } = useMailContext();
    const [formValues, setFormValues] = useState({
        to: searchParams.get("to") || initialFormValues.to,
        subject: searchParams.get("subject") || initialFormValues.subject,
        body: searchParams.get("body") || initialFormValues.body
    })
    const [formErrors, setFormErrors] = useState({});

    function register(name) {
        return {
            name,
            value: formValues[name],
            onChange: (e) => handleChange(name, e.target.value),
            onBlur: (e) => e.target.value.trim() && validate(name, e.target.value),
            autoComplete: "off"
        }
    }

    function handleChange(name, value) {
        setFormValues(prevFormValues => ({ ...prevFormValues, [name]: value }))
        updateUrl(name, value);

        if (!value.trim()) {
            setFormErrors(prevFormError => ({ ...prevFormError, [name]: "" }));
        } else if (formErrors[name]) {
            validate(name, value)
        }
    }

    function clearFormErrors() {
        setFormErrors({});
    }

    async function sendMail(e) {
        e.preventDefault();
        try {
            mailSchema.parse(formValues);
            clearFormErrors()

            const mail = await mailService.save({ ...formValues, from: user.email });
            addMail(mail);
            resetForm();
            onClose && onClose();
        } catch (err) {
            if (err instanceof z.ZodError) {
                handleError(err);
                return;
            }
            console.log(err);
        }
    }

    function resetForm() {
        setFormErrors({})
        setFormValues(initialFormValues)
        Object.keys(initialFormValues).forEach(deleteUrl);
    }


    function validate(name, value) {
        try {
            mailSchema.partial().parse({ [name]: value });
            setFormErrors(prevFormError => ({ ...prevFormError, [name]: "" }));

        } catch (err) {
            if (err instanceof z.ZodError) {
                handleError(err, name);
                return;
            }
            console.log(err);
        }
    }

    function handleError(zodError, name) {
        if (name) {
            const errorMessage = zodError.errors.find(e => e.path[0] === name)?.message;
            if (errorMessage) {
                setFormErrors(prevFormError => ({ ...prevFormError, [name]: errorMessage }));
            }
            return;
        }
        const formErrors = {};
        zodError.errors.forEach(e => {
            formErrors[e.path[0]] = e.message;
        });
        setFormErrors(formErrors);
    }


    return (
        <form onSubmit={sendMail} className="simple-form">
            <label>
                <span>From</span>
                <input defaultValue={user.email} disabled/>
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
    )
}

MailComposeForm.propTypes = {
    onClose: PropTypes.func,
}