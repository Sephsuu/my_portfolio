"use client";

import Image from "next/image";
import {
    AlertCircle,
    ArrowUp,
    BriefcaseBusiness,
    Code2,
    MessageCircleMore,
    RotateCcw,
    X,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { RequestClientError } from "@/lib/http/request-client";
import { sephsuuService } from "@/service/sephsuu.service";

type ChatMessage = {
    id: number;
    role: "user" | "assistant";
    content: string;
};

const greeting: ChatMessage = {
    id: 0,
    role: "assistant",
    content:
        "Hi! I'm Sephsuu AI. Ask me anything about Joseph's background, skills, or projects.",
};

const quickPrompts = [
    {
        icon: MessageCircleMore,
        label: "Who is Joseph?",
    },
    {
        icon: BriefcaseBusiness,
        label: "Show me his best projects",
    },
    {
        icon: Code2,
        label: "What is his tech stack?",
    },
];

function getErrorMessage(error: unknown) {
    if (error instanceof RequestClientError) {
        return error.status >= 500
            ? "The assistant is unavailable right now. Please try again."
            : error.message;
    }

    if (error instanceof TypeError) {
        return "I couldn't connect to the assistant. Make sure the API is running and try again.";
    }

    if (error instanceof Error) return error.message;

    return "Something went wrong. Please try again.";
}

export function FloatingPortfolioChat() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [failedPrompt, setFailedPrompt] = useState<string | null>(null);
    const nextMessageId = useRef(1);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (open) {
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [open, messages, isLoading, error]);

    async function sendMessage(content: string, appendUserMessage = true) {
        const prompt = content.trim();

        if (!prompt || isLoading) return;

        if (appendUserMessage) {
            const userMessageId = nextMessageId.current;
            nextMessageId.current += 1;
            setMessages((current) => [
                ...current,
                { id: userMessageId, role: "user", content: prompt },
            ]);
        }

        setInput("");
        setError(null);
        setFailedPrompt(null);
        setIsLoading(true);

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }

        try {
            const response = await sephsuuService.ask(prompt);
            const assistantMessageId = nextMessageId.current;
            nextMessageId.current += 1;
            setMessages((current) => [
                ...current,
                {
                    id: assistantMessageId,
                    role: "assistant",
                    content: response,
                },
            ]);
        } catch (requestError) {
            setError(getErrorMessage(requestError));
            setFailedPrompt(prompt);
        } finally {
            setIsLoading(false);
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        void sendMessage(input);
    }

    function resetConversation() {
        if (isLoading) return;

        setMessages([greeting]);
        setInput("");
        setError(null);
        setFailedPrompt(null);
        nextMessageId.current = 1;
        textareaRef.current?.focus();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    type="button"
                    aria-label="Open portfolio assistant"
                    className="group absolute top-[14%] right-[7%] z-30 rounded-2xl transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-3 focus-visible:outline-offset-4 md:top-[22%] md:right-[3%] lg:right-[7%]"
                >
                    <span className="hero-chat-float flex items-center gap-2.5 rounded-full bg-feather/95 px-5 py-3 text-sm font-bold text-roast shadow-[0_12px_30px_-12px_rgba(52,32,20,0.5)] backdrop-blur-xl transition-shadow group-hover:shadow-[0_16px_34px_-10px_rgba(52,32,20,0.58)] sm:text-base">
                        <span
                            aria-hidden="true"
                            className="-mt-0.75 size-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
                        />
                        Ask me anything
                    </span>
                </button>
            </DialogTrigger>

            <DialogContent
                showCloseButton={false}
                onOpenAutoFocus={(event) => {
                    event.preventDefault();
                    textareaRef.current?.focus();
                }}
                className="top-auto right-3 bottom-3 left-3 h-[min(44rem,calc(100dvh-1.5rem))] w-auto max-w-none grid-rows-[auto_minmax(0,1fr)_auto] translate-x-0 translate-y-0 gap-0 overflow-hidden rounded-[1.75rem] border-white/60 bg-[#f8f7f5] p-0 shadow-[0_28px_90px_-20px_rgba(28,25,23,0.55)] sm:right-6 sm:bottom-6 sm:left-auto sm:h-[min(42rem,calc(100dvh-3rem))] sm:w-[25rem] sm:max-w-[calc(100vw-3rem)]"
            >
                <DialogHeader className="flex-row items-center justify-between gap-3 border-b border-black/5 bg-white px-4 py-3 text-left">
                    <div className="flex min-w-0 items-center gap-3">
                        <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-[#d8d0c8] shadow-sm ring-1 ring-roast/10">
                            <Image
                                src="/images/sephsuu_avatar.png"
                                alt="Joseph Bataller"
                                fill
                                sizes="40px"
                                className="object-cover"
                            />
                        </span>
                        <div className="min-w-0">
                            <DialogTitle className="truncate text-base text-[#252323]">
                                Sephsuu AI
                            </DialogTitle>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            aria-label="Reset conversation"
                            title="Reset conversation"
                            disabled={messages.length === 1 || isLoading}
                            onClick={resetConversation}
                            className="grid size-9 place-items-center rounded-full text-[#73706d] transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-35"
                        >
                            <RotateCcw className="size-4" />
                        </button>
                        <DialogClose asChild>
                            <button
                                type="button"
                                aria-label="Close assistant"
                                className="grid size-9 place-items-center rounded-full text-[#73706d] transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-roast"
                            >
                                <X className="size-[18px]" />
                            </button>
                        </DialogClose>
                    </div>
                </DialogHeader>

                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5" aria-live="polite">
                    <div className="space-y-5">
                        {messages.map((message) => (
                            <article
                                key={message.id}
                                className={`flex gap-2.5 ${message.role === "user" ? "justify-end" : "items-start"}`}
                            >
                                {message.role === "assistant" && (
                                    <span className="relative mt-0.5 size-7 shrink-0 overflow-hidden rounded-full bg-[#d8d0c8] ring-1 ring-roast/10">
                                        <Image
                                            src="/images/sephsuu_avatar.png"
                                            alt=""
                                            fill
                                            sizes="28px"
                                            className="object-cover"
                                        />
                                    </span>
                                )}

                                <div
                                    className={
                                        message.role === "user"
                                            ? "max-w-[82%] rounded-2xl rounded-br-md bg-roast px-4 py-2.5 text-sm leading-6 text-white"
                                            : "max-w-[calc(100%-2.5rem)] rounded-2xl rounded-tl-md border border-black/5 bg-white px-4 py-3 text-sm leading-6 text-[#3d3937] shadow-sm"
                                    }
                                >
                                    {message.role === "assistant" ? (
                                        <ReactMarkdown
                                            components={{
                                                p: ({ children }) => (
                                                    <p className="mb-2 last:mb-0">{children}</p>
                                                ),
                                                ul: ({ children }) => (
                                                    <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>
                                                ),
                                                ol: ({ children }) => (
                                                    <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>
                                                ),
                                                strong: ({ children }) => (
                                                    <strong className="font-bold text-[#292625]">{children}</strong>
                                                ),
                                            }}
                                        >
                                            {message.content}
                                        </ReactMarkdown>
                                    ) : (
                                        message.content
                                    )}
                                </div>
                            </article>
                        ))}

                        {messages.length === 1 && !isLoading && (
                            <div className="grid gap-2 pl-9">
                                {quickPrompts.map(({ icon: Icon, label }) => (
                                    <button
                                        key={label}
                                        type="button"
                                        className="flex items-center gap-2.5 rounded-xl border border-black/8 bg-white px-3 py-2.5 text-left text-xs font-semibold text-roast shadow-sm transition-all hover:-translate-y-0.5 hover:border-roast/20 hover:shadow-md"
                                        onClick={() => void sendMessage(label)}
                                    >
                                        <Icon className="size-3.5 text-roast/60" aria-hidden="true" />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {isLoading && (
                            <article className="flex items-start gap-2.5" aria-label="Sephsuu AI is thinking">
                                <span className="relative mt-0.5 size-7 shrink-0 overflow-hidden rounded-full bg-[#d8d0c8] ring-1 ring-roast/10">
                                    <Image
                                        src="/images/sephsuu_avatar.png"
                                        alt=""
                                        fill
                                        sizes="28px"
                                        className="object-cover"
                                    />
                                </span>
                                <div className="flex h-10 items-center gap-1.5 rounded-2xl rounded-tl-md border border-black/5 bg-white px-4 shadow-sm" aria-hidden="true">
                                    {[0, 1, 2].map((dot) => (
                                        <span
                                            key={dot}
                                            className="size-1.5 animate-bounce rounded-full bg-roast/45"
                                            style={{ animationDelay: `${dot * 140}ms` }}
                                        />
                                    ))}
                                </div>
                            </article>
                        )}

                        {error && (
                            <div className="ml-9 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-900" role="alert">
                                <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                                <div>
                                    <p className="leading-5">{error}</p>
                                    {failedPrompt && (
                                        <button
                                            type="button"
                                            className="mt-1.5 font-bold underline decoration-red-300 underline-offset-4"
                                            onClick={() => void sendMessage(failedPrompt, false)}
                                        >
                                            Try again
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        <div ref={messageEndRef} />
                    </div>
                </div>

                <div className="border-t border-black/5 bg-white p-3">
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-end gap-2 rounded-2xl border border-black/10 bg-[#f8f7f5] p-1.5 transition-colors focus-within:border-roast/30 focus-within:bg-white"
                    >
                        <textarea
                            ref={textareaRef}
                            value={input}
                            rows={1}
                            disabled={isLoading}
                            aria-label="Message Sephsuu AI"
                            placeholder={isLoading ? "Waiting for a response..." : "Ask me anything..."}
                            className="max-h-24 min-h-10 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-5 text-[#302d2b] outline-none placeholder:text-[#918d89]"
                            onChange={(event) => {
                                setInput(event.target.value);
                                event.currentTarget.style.height = "auto";
                                event.currentTarget.style.height = `${Math.min(event.currentTarget.scrollHeight, 96)}px`;
                            }}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" && !event.shiftKey) {
                                    event.preventDefault();
                                    void sendMessage(input);
                                }
                            }}
                        />
                        <button
                            type="submit"
                            aria-label="Send message"
                            disabled={!input.trim() || isLoading}
                            className="grid size-10 shrink-0 place-items-center rounded-xl bg-roast text-white transition-all hover:bg-[#3c2000] disabled:bg-black/10 disabled:text-black/30"
                        >
                            <ArrowUp className="size-4" />
                        </button>
                    </form>
                    <p className="mt-2 text-center text-[10px] text-[#97928f]">
                        AI responses may contain mistakes. Verify important details.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
