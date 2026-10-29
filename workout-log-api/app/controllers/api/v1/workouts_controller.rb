class Api::V1::WorkoutsController < ApplicationController
  before_action :set_workout, only: %i[show update destroy]

  def index
    workouts = current_user.workouts.recent.map do |workout|
      workout.safe_attributes
    end
    render json: workouts, status: :ok
  end

  def create
    workout = current_user.workouts.build(workout_params)

    if workout.save
      render json: workout.safe_attributes, status: :created
    else
      render json: { errors: workout.errors.full_messages }, status: :unprocessable_content
    end
  end

  def show
    render json: @workout.safe_attributes, status: :ok
  end

  def update
    if @workout.update(workout_params)
      render json: @workout.safe_attributes, status: :ok
    else
      render json: { errors: @workout.errors.full_messages }, status: :unprocessable_content
    end
  end

  def destroy
    if @workout.destroy
      head :no_content
    else
      render json: { errors: @workout.errors.full_messages }, status: :unprocessable_content
    end
  end

  private
    def workout_params
      params.expect(workout: %i[memo date])
    end

    def set_workout
      @workout = current_user.workouts.find(params[:id])
    end
end
