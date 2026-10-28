class Api::V1::ExercisesController < ApplicationController
  before_action :set_exercise, only: %i[update destroy]

  def index
    exercises = current_user.exercises.recent.map do |exercise|
      exercise.safe_attributes
    end
    render json: exercises, status: :ok
  end

  def create
    exercise = current_user.exercises.build(exercise_params)
    if exercise.save
      render json: exercise.safe_attributes, status: :created
    else
      render json: { errors: exercise.errors.full_messages }, status: :unprocessable_content
    end
  end

  def update
    if @exercise.update(exercise_params)
      render json: @exercise.safe_attributes, status: :ok
    else
      render json: { errors: @exercise.errors.full_messages }, status: :unprocessable_content
    end
  end

  def destroy
    if @exercise.destroy
      head :no_content
    else
      render json: { errors: @exercise.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

    def exercise_params
      params.expect(exercise: [ :name ])
    end

    def set_exercise
      @exercise = current_user.exercises.find(params[:id])
    end
end
