import { Link } from "react-router-dom";
import ctaImage from '../assets/imgs/undraw_electricity_k2ft.svg';
import { LucideGithub, LucideLinkedin } from "lucide-react";
export function AboutUs() {
    return (
        <main>
            <section className="about-us container">
                <div className="text-center flex auto-center column gap5 m20">
                    <h2>Attribution</h2>
                    <p>{"(B)mail is a free personal mail service that doesn't track you."}</p>
                    <p>This app has been created by Ophir Bucai</p>
                    <section className="container">
                        <ul className="clean-list flex column gap20">
                            Technologies used:
                            <li><b style={{borderBottom: "1px dashed #000"}}>React</b>
                                <ul className="clean-list">
                                    <li>React Router</li>
                                    <li>React Context</li>
                                    <li>React Hooks</li>
                                </ul>
                            </li>
                            <li><b style={{borderBottom: "1px dashed #000"}}>SCSS</b>
                                <ul className="clean-list">
                                    <li>Flexbox</li>
                                    <li>Grid</li>
                                    <li>Responsive Design</li>
                                </ul>
                            </li>
                            <li><b style={{borderBottom: "1px dashed #000"}}>UI</b>
                                <ul className="clean-list">
                                    <li>Schema Validation: Zod</li>
                                    <li>Icons: Lucida React</li>
                                    <li>Date Formatting: DayJS</li>
                                </ul>
                            </li>
                            <li><b style={{borderBottom: "1px dashed #000"}}>Backend (to be added)</b>
                                <ul hidden className="clean-list">
                                    <li>NodeJS</li>
                                    <li>Express</li>
                                    <li>MongoDB</li>
                                    <li>JWT</li>
                                    <li>Socket.IO</li>
                                </ul>
                            </li>
                        </ul>
                    </section>
                </div>
                <div className="m20 text-center">
                    <h4 className="m5"><b>Social network:</b></h4>
                    <div className="flex auto-center gap5">
                        <a href="https://github.com/ophirbucai" target="_blank" rel="noreferrer" className="inline-block outlined-button small"><LucideGithub stroke="currentColor" style={{ translate: "2px 1px"}} size="1em" />&nbsp;GitHub</a>
                        <a href="https://linkedin.com/in/ophirbucai" target="_blank" rel="noreferrer" className="outlined-button small"><LucideLinkedin fill="currentColor" size="1em" style={{ translate: "2px 1px"}} stroke="currentColor" />&nbsp;&nbsp;LinkedIn</a>
                    </div>
                </div>
            </section>
            <div style={{ backgroundColor: "rgb(235,238,241)", boxShadow: "0 5px 15px rgb(0 0 0 / 5%)" }}>
                <section className="container text-center">
                    <img className="m20" src={ctaImage} width="20%" alt="A woman with a lightbulb" />
                    <h3 className="m10">Have an idea that would make our app even more useful?</h3>
                    <div>
                        <strong>I would love to hear from you!</strong>
                    </div>
                    <Link className="primary-button large m20 inline-block" to={"/mail/compose?to=ophirbucai@gmail.com&subject=Hey, I have an idea for you!"}>Write me a (B)mail</Link>
                </section>
            </div>
        </main>
    )
}