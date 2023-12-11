import { useRef } from "react";

export function useDelayedClose(cb, ...events) {
    const ref = useRef(null);
    async function onDelayedClose() {
        ref.current.classList.add("closing");
        await Promise.all((events.length ? events : ["transitionend", "animationend"]).map((event) => {
            return new Promise((resolve) => ref.current.addEventListener(event, resolve, { once: true }));
        }));
        cb();
    }

    return [ref, onDelayedClose];
}