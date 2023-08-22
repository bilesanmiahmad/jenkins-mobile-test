export interface IDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  country: string;
}

export interface Signature {
  check: "string" | "image" | "text";
  string: string;
}

export interface IUser extends IDocument {
  _id: string;
  email: string;
  position?: string;
  lastName: string;
  username: string;
  password: string;
  avatar?: string;
  address: IAddress;
  escrowId?: string;
  firstName: string;
  phoneNumber: string;
  gender: string;
  loginCount: number;
  signature: Signature;
  dateOfBirth: Date;
  roles?: string[];
}

export interface VerifyOtpStatus {
  success: boolean;
  message: string;
  user?: IUser;
  authToken?: string;
}
