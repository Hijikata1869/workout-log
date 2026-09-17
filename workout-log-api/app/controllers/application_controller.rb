class ApplicationController < ActionController::API
  include ActionController::Cookies
  include Authentication
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  private

  def record_not_found
    render json: { errors: "Record not found" }, status: :not_found
  end
end
