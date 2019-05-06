class AuthController < ApplicationController
  def login
    result = {
      ok: false
    }

    errors = []
    is_valid_for_auth = false
    user = User.find_for_authentication(email: params[:email])

    if user
      is_valid_for_auth = user.valid_for_authentication? {
        user.valid_password?(params[:password])
      }
    end

    unless is_valid_for_auth
      errors << {
        type: 'invalid',
        message: 'Invalid Account.'
      }
    else
      result[:ok] = true
      result[:user] = user
      sign_in(user)
    end

    result[:errors] = errors
    render json: result
  end

  def logout
    sign_out(current_user)
    redirect_to '/'
  end

end