import type { Workout, CreateWorkoutResult } from "../types/workout";
import type { ErrorResponse } from "../types/api";

export const createWorkout = async (date: string): Promise<CreateWorkoutResult> => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}workouts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            workout: {
            date: date,
            },
        }),
        credentials: "include",
        });

        if (res.ok) {
        const data: Workout = await res.json();
        return { ok: true, data };
        } else {
        const errorResponse: ErrorResponse = await res.json();
        const errorMessages = errorResponse.errors;
        console.error(errorMessages);
        return { ok: false, errors: errorMessages };
        }
    } catch (error) {
        console.error(error);
        return { ok: false, errors: ["通信に失敗しました"]}
    }
}