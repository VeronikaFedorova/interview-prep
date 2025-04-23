type FormType = 'sign-in' | 'sign-up';

interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

interface Interview {
  id: string;
  userId: string;
  role: string;
  type: string;
  level: string;
  techstack: string[];
  questions: string[];
  finalized: boolean;
  createdAt: string;
}

interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

interface TechIconProps {
  techStack: string[];
}
