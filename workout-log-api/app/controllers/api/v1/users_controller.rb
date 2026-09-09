class Api::V1::UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      render json: user.safe_attributes, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

  def user_params
    params.expect(user: %i[nickname email password password_confirmation])
  end
end
