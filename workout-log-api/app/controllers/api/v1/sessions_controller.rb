class Api::V1::SessionsController < ApplicationController
  allow_unauthenticated_access only: :create
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { render json: { errors: [ "時間を置いて再度ログインしてください" ] }, status: :too_many_requests }

  def create
    if user = User.authenticate_by(params.permit(:email, :password))
      start_new_session_for user
      render json: { message: "ログインしました" }, status: :ok
    else
      render json: { errors: [ "メールアドレスかパスワードが間違っています" ] }, status: :unauthorized
    end
  end

  def show
    render json: current_user.safe_attributes, status: :ok
  end

  def destroy
    terminate_session
    head :no_content
  end
end
