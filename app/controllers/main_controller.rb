class MainController < ApplicationController
  def index
    render :index
  end

  def login
    render :login
  end

  def test
    # user = User.find_by(email: 'konekred@gmail.com')
    # user.valid_password?('ABC12abc1')
    render json: {
      session: session,
      current_user: current_user,
      # valid_password: user.valid_password?('')
    }
  end
end