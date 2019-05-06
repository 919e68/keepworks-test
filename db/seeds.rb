# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

# start: seed theaters and movies
theaters = [
  {
    name: 'Theater 1',
    capacity: 100,
    movies: [
      {
        title: 'Aladdin',
        price: 300,
        showing_start: '2019-05-14',
      },
      {
        title: 'Avengers: Endgame',
        price: 350,
        showing_start: '2019-04-26'
      },
      {
        title: 'Captain Marvel',
        price: 300,
        showing_start: '2019-03-08'
      }
    ]
  },
  {
    name: 'Theater 2',
    capacity: 100,
    movies: [
      {
        title: 'Hellboy',
        price: 250,
        showing_start: '2019-04-12',
      },
      {
        title: 'John Wick: Chapter 3 – Parabellum',
        price: 300,
        showing_start: '2019-05-18',
      }
    ]
  },
  {
    name: 'Theater 3',
    capacity: 100,
    movies: [
      {
        title: 'After',
        price: 250,
        showing_start: '2019-04-12',
      }
    ]
  },
  {
    name: 'Theater 4',
    capacity: 100,
    movies: [
      {
        title: 'John Wick: Chapter 3 – Parabellum',
        price: 300,
        showing_start: '2019-05-18',
      }
    ]
  },
  {
    name: 'Theater 5',
    capacity: 100,
    movies: [
      {
        title: 'Hellboy',
        price: 250,
        showing_start: '2019-04-12',
      }
    ]
  }
]

theaters.each do |data|
  theater = Theater.find_by(name: data[:name])
  unless theater
    theater = Theater.new
    theater.name = data[:name]
    theater.capacity = data[:capacity]

    data[:movies].each do |movieData|
      movieData[:showing_end] = (movieData[:showing_start].to_date + 15.days).to_s
      movie = Movie.find_by(title: movieData[:title])
      unless movie
        movie = Movie.new(movieData)
      end
      theater.movies << movie
    end

    theater.save
  end
end
# end: seed theaters and movies


# start: time_slots
time_slots = [
  {
    name: 'Slot 1',
    start_time: '10:00:00',
    end_time: '13:00:00'
  },
  {
    name: 'Slot 2',
    start_time: '13:00:00',
    end_time: '16:00:00'
  },
  {
    name: 'Slot 3',
    start_time: '16:00:00',
    end_time: '19:00:00'
  },
  {
    name: 'Slot 4',
    start_time: '19:00:00',
    end_time: '22:00:00'
  }
]

time_slots.each do |data|
  TimeSlot.where(name: data[:name]).first_or_create do |time_slot|
    time_slot.start_time = data[:start_time]
    time_slot.end_time = data[:end_time]
  end
end
# end: time_slots


# start: users
users = [
  {
    email: 'konekred@gmail.com',
    fullname: 'Wilson Anciro',
    password: 'ABC12abc',
    gender: 'Male'
  },
  {
    email: 'athena@gmail.com',
    fullname: 'Athena Zoei Anciro',
    password: 'ABC12abc',
    gender: 'Female'
  }
]

users.each do |data|
  User.where(email: data[:email]).first_or_create do |user|
    user.fullname = data[:fullname]
    user.password = data[:password]
    user.gender = data[:gender]
  end
end
# end: users


# start: coupons
coupons = [
  {
    coupon_code: '000000',
    discount_type: 'percentage',
    discount: 10
  },
  {
    coupon_code: '111111',
    discount_type: 'fixed',
    discount: 100
  },
  {
    coupon_code: '222222',
    discount_type: 'percentage',
    discount: 100
  },
  {
    coupon_code: '333333',
    discount_type: 'percentage',
    discount: 50
  }
]

coupons.each do |data|
  Coupon.where(coupon_code: data[:coupon_code]).first_or_create do |coupon|
    coupon.discount_type = data[:discount_type]
    coupon.discount = data[:discount]
  end
end
# end: coupons