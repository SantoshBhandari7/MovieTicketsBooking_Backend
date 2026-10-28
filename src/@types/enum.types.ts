export enum Role {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  USER = "USER",
}

export enum Type {
  REGULAR = "REGULAR",
  PREMIUM = "PREMIUM",
  VIP = "VIP",
}
export enum Status {
  SCHEDULED = "SCHEDULED",
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
}

export enum SeatStatus {
  AVAILABLE = "AVAILABLE",
  HELD = "HELD",
  BOOKED = "BOOKED",
}

export enum BookingStatus {
  PENDING = "PENDING",
  CANCELED = "CANCEL",
  COMPLETED = "COMPLETED",
  EXPIRED = "EXPIRED",
}

export enum PaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUND = "REFUND",
}
