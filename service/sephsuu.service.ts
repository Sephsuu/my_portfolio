import { requestClientData } from "@/lib/http/request-client";

export type SephsuuRequest = {
    user_input: string;
};

type SephsuuApiResponse =
    | string
    | {
          response?: unknown;
          answer?: unknown;
          message?: unknown;
          output?: unknown;
          content?: unknown;
          data?: unknown;
      };

function getAssistantMessage(data: SephsuuApiResponse) {
    if (typeof data === "string" && data.trim()) {
        return data.trim();
    }

    if (data && typeof data === "object") {
        const possibleMessages = [
            data.response,
            data.answer,
            data.message,
            data.output,
            data.content,
            data.data,
        ];

        const message = possibleMessages.find(
            (value): value is string =>
                typeof value === "string" && value.trim().length > 0
        );

        if (message) return message.trim();
    }

    throw new Error("The assistant returned an empty response.");
}

export class SephsuuService {
    private readonly endpoint = "/api/sephsuu";

    async ask(userInput: string): Promise<string> {
        const payload: SephsuuRequest = {
            user_input: userInput.trim(),
        };

        if (!payload.user_input) {
            throw new Error("Please enter a message before sending.");
        }

        const response = await requestClientData<SephsuuApiResponse>(
            this.endpoint,
            "POST",
            undefined,
            payload
        );

        return getAssistantMessage(response);
    }
}

export const sephsuuService = new SephsuuService();
