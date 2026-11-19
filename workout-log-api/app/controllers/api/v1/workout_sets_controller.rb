class Api::V1::WorkoutSetsController < ApplicationController
  def create
    workout = current_user.workouts.find(params[:workout_id])

    exercise = current_user.exercises.find(params[:exercise_id])

    workout_exercise = nil

    ActiveRecord::Base.transaction do
      workout_exercise = workout.workout_exercises.find_or_create_by!(exercise: exercise)

      workout_exercise.workout_sets.create!(workout_set_params)
    end

    render json: workout_exercise.safe_attributes, status: :created

  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_content
  end

  def update
    workout_set = current_user.workout_sets.find(params[:id])
    if workout_set.update(workout_set_params)
      render json: workout_set.workout_exercise.safe_attributes, status: :ok
    else
      render json: { errors: workout_set.errors.full_messages }, status: :unprocessable_content
    end
  end

  private
    def workout_set_params
      params.expect(workout_set: %i[weight reps interval_seconds])
    end
end
