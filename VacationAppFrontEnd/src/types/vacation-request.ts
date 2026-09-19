interface VacationRequest {
  id: number;
  requestedBy: {
    email: string;
    fullName: string;
    id: number;
  };
  startDate: Date;
  endDate: Date;
  status: string;
  comment?: string;
  createdAt: Date;
  reviewedBy: {} | null;
  decisionDate: Date | null;
}
