FROM ruby:2.4.5

RUN apt-get update && \
    apt-get install -y \
    build-essential \
    libpq-dev \
    less

# :begin install latest nodejs
ENV NODE_VERSION 10.x
RUN curl -sL "https://deb.nodesource.com/setup_$NODE_VERSION" -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get install -y nodejs && \
    rm nodesource_setup.sh
# :end install latest nodejs

# :begin install yarn
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install yarn
# :end install yarn


WORKDIR /usr/src/app
COPY . .

RUN gem install bundler
RUN bundle

# RUN rails db:migrate
# RUN yarn install
# RUN ./bin/webpack