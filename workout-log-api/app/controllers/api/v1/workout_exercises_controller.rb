class Api::V1::WorkoutExercisesController < ApplicationController
  before_action :set_workout_exercise, only: %i[update destroy]

  def update
    if @workout_exercise.update(workout_exercise_params)
      render json: @workout_exercise.safe_attributes, status: :ok
    else
      render json: { errors: @workout_exercise.errors.full_messages }, status: :unprocessable_content
    end
  end

  def destroy
    if @workout_exercise.destroy
      head :no_content
    else
      render json: { errors: @workout_exercise.errors.full_messages }, status: :unprocessable_content
    end
  end

  private
    def workout_exercise_params
      params.expect(workout_exercise: %i[memo])
    end

    def set_workout_exercise
      @workout_exercise = current_user.workout_exercises.find(params[:id])
    end
end
