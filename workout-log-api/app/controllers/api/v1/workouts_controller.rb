class Api::V1::WorkoutsController < ApplicationController
  def create
    workout = current_user.workouts.build(workout_params)

    if workout.save
      render json: workout.safe_attributes, status: :created
    else
      render json: { errors: workout.errors.full_messages }, status: :unprocessable_content
    end
  end

  private
    def workout_params
      params.expect(workout: %i[memo date])
    end
end
