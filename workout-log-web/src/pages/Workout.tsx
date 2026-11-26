import { useParams } from "react-router";

export const Workout = () => {
  const params = useParams();

  return (
    <>
      <h1>{params.workoutId}</h1>
    </>
  );
};
