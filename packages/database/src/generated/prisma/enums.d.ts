export declare const UserRole: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly SUSPENDED: "SUSPENDED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const OrganizationStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly SUSPENDED: "SUSPENDED";
};
export type OrganizationStatus = (typeof OrganizationStatus)[keyof typeof OrganizationStatus];
export declare const OrganizationMemberRole: {
    readonly OWNER: "OWNER";
    readonly ADMIN: "ADMIN";
    readonly MEMBER: "MEMBER";
};
export type OrganizationMemberRole = (typeof OrganizationMemberRole)[keyof typeof OrganizationMemberRole];
export declare const EventStatus: {
    readonly DRAFT: "DRAFT";
    readonly PUBLISHED: "PUBLISHED";
    readonly CANCELLED: "CANCELLED";
    readonly COMPLETED: "COMPLETED";
};
export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];
export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
    readonly CANCELLED: "CANCELLED";
    readonly REFUNDED: "REFUNDED";
    readonly EXPIRED: "EXPIRED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const TicketStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly USED: "USED";
    readonly CANCELLED: "CANCELLED";
    readonly REFUNDED: "REFUNDED";
    readonly TRANSFERRED: "TRANSFERRED";
};
export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];
export declare const PaymentProvider: {
    readonly STRIPE: "STRIPE";
    readonly PAYPAL: "PAYPAL";
    readonly ZEFFY: "ZEFFY";
    readonly MANUAL: "MANUAL";
};
export type PaymentProvider = (typeof PaymentProvider)[keyof typeof PaymentProvider];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly PROCESSING: "PROCESSING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
    readonly REFUNDED: "REFUNDED";
    readonly CANCELLED: "CANCELLED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const TemplateType: {
    readonly EMAIL_ORDER_CONFIRMATION: "EMAIL_ORDER_CONFIRMATION";
    readonly EMAIL_TICKET: "EMAIL_TICKET";
    readonly EMAIL_EVENT_REMINDER: "EMAIL_EVENT_REMINDER";
    readonly PDF_TICKET: "PDF_TICKET";
};
export type TemplateType = (typeof TemplateType)[keyof typeof TemplateType];
export declare const WebhookEvent: {
    readonly ORDER_CREATED: "ORDER_CREATED";
    readonly ORDER_COMPLETED: "ORDER_COMPLETED";
    readonly ORDER_CANCELLED: "ORDER_CANCELLED";
    readonly ORDER_REFUNDED: "ORDER_REFUNDED";
    readonly TICKET_CREATED: "TICKET_CREATED";
    readonly TICKET_CHECKED_IN: "TICKET_CHECKED_IN";
    readonly TICKET_TRANSFERRED: "TICKET_TRANSFERRED";
    readonly EVENT_PUBLISHED: "EVENT_PUBLISHED";
    readonly EVENT_CANCELLED: "EVENT_CANCELLED";
};
export type WebhookEvent = (typeof WebhookEvent)[keyof typeof WebhookEvent];
export declare const WebhookDeliveryStatus: {
    readonly PENDING: "PENDING";
    readonly DELIVERED: "DELIVERED";
    readonly FAILED: "FAILED";
    readonly RETRYING: "RETRYING";
};
export type WebhookDeliveryStatus = (typeof WebhookDeliveryStatus)[keyof typeof WebhookDeliveryStatus];
export declare const CheckInMethod: {
    readonly MANUAL: "MANUAL";
    readonly QR_SCAN: "QR_SCAN";
    readonly APP: "APP";
};
export type CheckInMethod = (typeof CheckInMethod)[keyof typeof CheckInMethod];
//# sourceMappingURL=enums.d.ts.map