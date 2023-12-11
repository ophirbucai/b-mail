import { HashRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage.jsx";
import { AboutUs } from "./pages/AboutUs.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { MailIndex } from "./pages/MailIndex.jsx";
import { Layout } from "./cmps/Layout/Layout.jsx";
import { MailCompose } from "./cmps/MailCompose/MailCompose.jsx";
import { MailContextProvider } from "./context/MailContextProvider.jsx";
import { MailDetails } from "./cmps/MailDetails/MailDetails.jsx";

export default function App() {
    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/mail" element={<MailContextProvider />}>
                            <Route path="/mail" element={<MailIndex />}>
                                <Route path="/mail/compose" element={<MailCompose />} />
                                <Route path="/mail/:mailId" element={<MailDetails />} />
                            </Route>
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </HashRouter>
        </div>
    );
}
