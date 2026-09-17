class Api::V1::UsersController < ApplicationController
  allow_unauthenticated_access only: :create

  def create
    user = User.new(user_params)
    if user.save
      start_new_session_for user
      render json: user.safe_attributes, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_content
    end
  end

  def update
    if current_user.update(user_update_params)
      render json: current_user.safe_attributes, status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_content
    end
  end

  def destroy
    current_user.destroy
    cookies.delete(:session_id)
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
