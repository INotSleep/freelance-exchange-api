export enum AccountStatus {
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  KYC_NOT_VERIFIED = 'KYC_NOT_VERIFIED',
  ACTIVE = 'ACTIVE',
  LOGIN_LOCKED = 'LOGIN_LOCKED',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
}

export enum ProfileType {
  COMPANY = 'COMPANY',
  INDIVIDUAL = 'INDIVIDUAL',
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum ProfileStatus {
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
}

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum BidStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
}

export enum VerificationKind {
  IDENTITY_DOCUMENT = 'IDENTITY_DOCUMENT',
  COMPANY_REGISTRY = 'COMPANY_REGISTRY',
}

export enum PaymentMethod {
  CARD = 'CARD',
  CRYPTO = 'CRYPTO',
}
