module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :require_authentication
  end

  class_methods do
    def allow_unauthenticated_access(**options)
      skip_before_action :require_authentication, **options
    end
  end

  private
    def require_authentication
      resume_session || request_authentication
    end

    def resume_session
      @current_session ||= find_session_by_cookie
    end

    def find_session_by_cookie
      Session.find_by(id: cookies.signed[:session_id]) if cookies.signed[:session_id]
    end

    def request_authentication
      render json: { errors: [ "ログインしてください" ] }, status: :unauthorized
    end

    def start_new_session_for(user)
      new_session = user.sessions.create!
      cookies.signed[:session_id] = { value: new_session.id, httponly: true, same_site: :lax, secure: Rails.env.production? }
      new_session
    end

    def terminate_session
      @current_session.destroy
      cookies.delete(:session_id)
    end

    def current_user
      @current_user ||= @current_session&.user
    end
end
