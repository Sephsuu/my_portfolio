"use client";

import {
    AlertCircle,
    ArrowUp,
    Boxes,
    Code2,
    MessageCircleMore,
    Plus,
    RotateCcw,
    Sparkles,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

import { RequestClientError } from "@/lib/http/request-client";
import { sephsuuService } from "@/service/sephsuu.service";
import { PlaygroundSidebar } from "@/components/custom/PlaygroundSidebar";
import { AppAvatar } from "@/components/shared/AppAvatar";
import { AppButton } from "@/components/shared/AppButton";
import { AppTextarea } from "@/components/shared/AppTextarea";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

type Message = {
    id: number;
    role: "user" | "assistant";
    content: string;
};

const suggestions = [
    {
        icon: MessageCircleMore,
        title: "Meet Joseph",
        prompt: "Who is Joseph?",
    },
    {
        icon: Boxes,
        title: "Explore his work",
        prompt: "What are Joseph's featured projects?",
    },
    {
        icon: Code2,
        title: "View the tech stack",
        prompt: "What technologies does Joseph work with?",
    },
];

function getErrorMessage(error: unknown) {
    if (error instanceof RequestClientError) {
        return error.status >= 500
            ? "The assistant is having trouble responding right now. Please try again."
            : error.message;
    }

    if (error instanceof TypeError) {
        return "I couldn't reach the Sephsuu service. Make sure the API is running, then try again.";
    }

    if (error instanceof Error) return error.message;

    return "Something went wrong while sending your message. Please try again.";
}

export function PlaygroundPage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [failedPrompt, setFailedPrompt] = useState<string | null>(null);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const nextMessageId = useRef(0);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading, error]);

    async function sendMessage(content: string, appendUserMessage = true) {
        const prompt = content.trim();

        if (!prompt || isLoading) return;

        if (appendUserMessage) {
            const messageId = nextMessageId.current;
            nextMessageId.current += 1;
            setMessages((current) => [
                ...current,
                { id: messageId, role: "user", content: prompt },
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
            const responseId = nextMessageId.current;
            nextMessageId.current += 1;
            setMessages((current) => [
                ...current,
                { id: responseId, role: "assistant", content: response },
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

    function startNewChat() {
        if (isLoading) return;

        setMessages([]);
        setInput("");
        setError(null);
        setFailedPrompt(null);
        textareaRef.current?.focus();
    }

    return (
        <main className="flex h-dvh w-full overflow-hidden bg-background text-foreground">
            <PlaygroundSidebar />
            <SidebarInset className="relative min-w-0 overflow-hidden">
                <header className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="size-10 rounded-xl" />
                        <div>
                            <p className="text-sm font-semibold tracking-tight sm:text-[15px]">Sephsuu AI</p>
                            <p className="flex items-center gap-1.5 text-[11px] text-[#8a8a91]">
                                <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                                Portfolio assistant
                            </p>
                        </div>
                    </div>

                    <AppButton
                        type="button"
                        variant="outline"
                        disabled={messages.length === 0 || isLoading}
                        onClick={startNewChat}
                        className="rounded-full px-3.5 text-xs sm:text-sm"
                    >
                        <RotateCcw className="size-3.5" aria-hidden="true" />
                        <span className="hidden sm:inline">New chat</span>
                    </AppButton>
                </header>

                <div className="min-h-0 flex-1 overflow-y-auto">
                    {messages.length === 0 ? (
                        <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col items-center justify-center px-5 pb-28 pt-12 sm:px-8">
                            <div className="mb-6 grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                                <Sparkles className="size-5" aria-hidden="true" />
                            </div>
                            <h1 className="text-center text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
                                How can I help?
                            </h1>
                            <p className="mt-3 max-w-md text-center text-sm leading-6 text-muted-foreground sm:text-[15px]">
                                Ask about Joseph&apos;s background, technical skills, experience, or software projects.
                            </p>

                            <div className="mt-10 grid w-full gap-2 sm:grid-cols-3">
                                {suggestions.map((suggestion) => {
                                    const Icon = suggestion.icon;

                                    return (
                                        <AppButton
                                            key={suggestion.prompt}
                                            type="button"
                                            disabled={isLoading}
                                            variant="outline"
                                            className="group h-auto min-h-25 flex-col items-start justify-between rounded-2xl p-4 text-left hover:-translate-y-0.5 hover:bg-accent/50 hover:shadow-sm"
                                            onClick={() => void sendMessage(suggestion.prompt)}
                                        >
                                            <Icon className="size-[18px] text-muted-foreground transition-colors group-hover:text-primary" strokeWidth={1.8} />
                                            <span className="mt-4 text-[13px] font-medium text-foreground">
                                                {suggestion.title}
                                            </span>
                                        </AppButton>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="mx-auto w-full max-w-3xl px-5 pb-36 pt-8 sm:px-8 sm:pt-12">
                            <div className="space-y-9" aria-live="polite">
                                {messages.map((message) => (
                                    <article
                                        key={message.id}
                                        className={`flex gap-4 ${message.role === "user" ? "justify-end" : "items-start"}`}
                                    >
                                        {message.role === "assistant" && (
                                            <AppAvatar className="mt-0.5 size-8 shrink-0" fallback="AI" />
                                        )}

                                        <div
                                            className={
                                                message.role === "user"
                                                    ? "max-w-[85%] rounded-3xl bg-[#f1f1f1] px-5 py-3 text-[15px] leading-6 sm:max-w-[75%]"
                                                    : "max-w-[calc(100%-3rem)] whitespace-pre-wrap pt-1 text-[15px] leading-7 text-[#35353a]"
                                            }
                                        >
                                            {message.content}
                                        </div>
                                    </article>
                                ))}

                                {isLoading && (
                                    <article className="flex items-start gap-4" aria-label="Sephsuu AI is thinking">
                                        <AppAvatar className="mt-0.5 size-8 shrink-0" fallback="AI" />
                                        <div className="flex h-9 items-center gap-1.5" aria-hidden="true">
                                            {[0, 1, 2].map((dot) => (
                                                <span
                                                    key={dot}
                                                    className="size-1.5 animate-bounce rounded-full bg-[#8b8b91]"
                                                    style={{ animationDelay: `${dot * 140}ms` }}
                                                />
                                            ))}
                                        </div>
                                    </article>
                                )}

                                {error && (
                                    <div className="ml-12 flex max-w-xl items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
                                        <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                                        <div className="min-w-0 flex-1">
                                            <p className="leading-5">{error}</p>
                                            {failedPrompt && (
                                                <button
                                                    type="button"
                                                    className="mt-2 font-semibold underline decoration-red-300 underline-offset-4 transition-opacity hover:opacity-70"
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
                    )}
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white to-transparent px-4 pb-3 pt-12 sm:px-6">
                    <form
                        onSubmit={handleSubmit}
                        className="pointer-events-auto mx-auto flex w-full max-w-3xl items-end gap-2 rounded-[26px] border border-black/10 bg-white p-2 shadow-[0_4px_24px_rgba(0,0,0,0.09)] focus-within:border-black/20"
                    >
                        <AppButton
                            type="button"
                            aria-label="Start a new chat"
                            title="Start a new chat"
                            disabled={(messages.length === 0 && !input) || isLoading}
                            onClick={startNewChat}
                            variant="ghost"
                            size="icon"
                            className="size-10 shrink-0 rounded-full"
                        >
                            <Plus className="size-5" strokeWidth={1.8} />
                        </AppButton>

                        <AppTextarea
                            ref={textareaRef}
                            value={input}
                            aria-label="Message Sephsuu AI"
                            rows={1}
                            disabled={isLoading}
                            placeholder={isLoading ? "Waiting for a response..." : "Ask about Joseph or his work"}
                            className="min-w-0 flex-1"
                            textareaClassName="max-h-32 min-h-10 resize-none border-0 bg-transparent px-1 py-2.5 text-[15px] leading-5 shadow-none focus-visible:ring-0"
                            onChange={(event) => {
                                setInput(event.target.value);
                                event.currentTarget.style.height = "auto";
                                event.currentTarget.style.height = `${Math.min(event.currentTarget.scrollHeight, 128)}px`;
                            }}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" && !event.shiftKey) {
                                    event.preventDefault();
                                    void sendMessage(input);
                                }
                            }}
                        />

                        <AppButton
                            type="submit"
                            aria-label="Send message"
                            disabled={!input.trim() || isLoading}
                            size="icon"
                            className="size-10 shrink-0 rounded-full"
                        >
                            <ArrowUp className="size-[18px]" strokeWidth={2.2} />
                        </AppButton>
                    </form>
                    <p className="pointer-events-auto mx-auto mt-2 max-w-3xl text-center text-[10px] leading-4 text-[#929298] sm:text-[11px]">
                        Sephsuu AI can make mistakes. Verify important details before relying on them.
                    </p>
                </div>
            </SidebarInset>
        </main>
    );
}
