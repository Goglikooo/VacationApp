interface VacationRequest {
  id: number;
  requestedBy: {
    email: string;
    fullName: string;
    id: number;
  };
  startDate: string;
  endDate: string;
  type: string;
  status: string;
  comment?: string;
  createdAt: Date;
  reviewedBy: {} | null;
  decisionDate: Date | null;
}
