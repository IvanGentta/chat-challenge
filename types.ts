export interface Message {
  id: string;
  text: string;
  user: {
    email: string;
  };
  createdAt: string;
}
