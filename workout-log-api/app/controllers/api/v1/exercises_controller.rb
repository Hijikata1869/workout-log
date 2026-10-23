class Api::V1::ExercisesController < ApplicationController
  def create
    exercise = current_user.exercises.build(exercise_params)
    if exercise.save
      render json: exercise, status: :created
    else
      render json: { errors: exercise.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

    def exercise_params
      params.expect(exercise: [ :name ])
    end
end
