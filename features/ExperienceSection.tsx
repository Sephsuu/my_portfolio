"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { projects } from "@/data/projects";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

export function ExperienceSection() {
    const [projCount, setProjCount] = useState(3);
    return (
        <section className="p-4">
            <div className="text-4xl font-bold text-center my-8">Hands-on Experience</div>

            <div className="space-y-10">
                {projects.slice(0, projCount).map((item, i) => (
                    <div 
                        className={`grid grid-cols-2`} 
                        key={item.title}
                    >
                        <div className={`${i % 2 === 0 ? "order-1" : "order-2"}`}>
                            <img 
                                src={`/images/projects/${item.images[0]}`}
                                className="w-150 mx-auto rounded-xl shadow-md border border-slate-300"
                            />
                        </div>
                        <div 
                            className={`${i % 2 === 0 
                                ? "order-2 text-left items-start" 
                                : "order-1 text-right items-end ml-auto"} 
                                my-auto space-y-2 w-8/10 flex flex-col`}
                        >
                            <div className="text-2xl font-bold hover:underline cursor-pointer">{item.title}</div>
                            <Separator className="bg-slate-300" />
                            <div className="">
                                {item.description}
                            </div>
                            <div className="mt-4">
                                <span className="font-bold mr-2">Technologies:</span> 
                                {item.technologies.map((tech) => (
                                    <Fragment key={tech}>
                                        <span 
                                            className="mr-1.5 hover:font-bold hover:underline cursor-pointer"
                                        >
                                            {tech},
                                        </span>
                                    </Fragment>
                                ))}
                            </div>
                            <div>
                                <span className="font-bold mr-2">Role:</span> 
                                <span>{item.role}</span>
                            </div>
                            <Button
                                className="rounded-none mt-2 text-lg hover:text-black hover:border hover:border-black hover:bg-slate-50"
                            >
                                View More
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {projCount < projects.length && (
                <button
                    onClick={() => setProjCount(prev => prev + 3)}
                    className="underline text-5xl mx-auto flex-center mt-18"
                >
                    See More
                </button>
            )}

        </section>
    )
}