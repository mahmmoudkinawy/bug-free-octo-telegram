export interface ProofResponse {
  Proofs: Proof[];
}

export interface Proof {
  _id: string;
  delegate: string;
  order: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
