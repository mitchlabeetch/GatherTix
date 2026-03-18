import { Resend } from "resend";
export declare const resend: Resend | null;
export interface EmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    from?: string;
    replyTo?: string;
}
export declare function sendEmail(options: EmailOptions): Promise<{
    success: boolean;
    error?: string;
}>;
export * from "./templates/order-confirmation";
export * from "./templates/ticket-email";
//# sourceMappingURL=index.d.ts.map