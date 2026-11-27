export type Workout = {
    id: number;
    date: string;
    memo: string | null;
};

export type CreateWorkoutResult = { ok: true; data: Workout } | { ok: false; errors: string[] };