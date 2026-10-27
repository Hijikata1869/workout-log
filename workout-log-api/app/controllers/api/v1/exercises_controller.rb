class Api::V1::ExercisesController < ApplicationController
  def index
    exercises = current_user.exercises.recent.map do |exercise|
      exercise.safe_exercise_attributes
    end
    render json: exercises, status: :ok
  end

  def create
    exercise = current_user.exercises.build(exercise_params)
    if exercise.save
      render json: exercise.safe_exercise_attributes, status: :created
    else
      render json: { errors: exercise.errors.full_messages }, status: :unprocessable_content
    end
  end

  def destroy
    exercise = current_user.exercises.find(params[:id])
    exercise.destroy
    head :no_content
  end

  private

    def exercise_params
      params.expect(exercise: [ :name ])
    end
end
