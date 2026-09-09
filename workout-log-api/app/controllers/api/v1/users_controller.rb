class Api::V1::UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      render json: user.safe_attributes, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_content
    end
  end

  def show
    user = User.find(params[:id])
    render json: user.safe_attributes, status: :ok
  end

  def update
    user = User.find(params[:id])
    if user.update(user_update_params)
      render json: user.safe_attributes, status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_content
    end
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    head :no_content
  end

  private

  def user_params
    params.expect(user: %i[nickname email password password_confirmation])
  end

  def user_update_params
    params.expect(user: %i[nickname email])
  end
end
